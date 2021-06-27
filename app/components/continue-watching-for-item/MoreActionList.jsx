import React, { useState, useEffect, useRef } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as FileSystem from 'expo-file-system'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Dispatch Actions */
import * as AUTH_ACTION from './../../redux/modules/auth/actions'

/** Selectors */
import { authSelector } from './../../redux/modules/auth/selectors';

/** Styles */
import styles from './../../assets/stylesheets/moreActionList';

/** Components */
import DisplayAction from './DisplayAction';

/** RNE Components */
import { BottomSheet } from 'react-native-elements';

/** Utils/Configs */
import * as asyncStorage from './../../utils/asyncStorage'
import VIDEO_STATUSES from './../../config/video.statuses';
import { ensureFileExists } from './../../utils/cacheImage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MoreActionList = ({
    AUTH,
    selectedVideo,
    handlePressRemoveRecentlyWatchedShow,
    handleToggleLikeRecentlyWatchedShow,
    handleToggleUnLikeRecentlyWatchedShow,
    isVisible,
    setIsVisible
}) => 
{
    const FILE_URI = `${ FileSystem.documentDirectory }${ selectedVideo.title }${ selectedVideo.id }.mp4`;
    const [ status, setStatus ] = useState('');
    const [ progress, setProgress ] = useState(0);
    const [downloadResumable, setDownloadResumable] = useState(null);

    const findShowInUserRatedShows = AUTH.ratedShows.find(({ id }) => id === selectedVideo.id);

    const actionList = 
    [
        {
            title: selectedVideo.title,
            iconType: 'feather',
            iconNameOnEnd: 'x-circle',
            show: true,
            onPressEndIcon: () => setIsVisible(false),
            titleStyle: styles.moreActionHeader,
            containerStyle: styles.moreActionHeaderContainer,
        },
        { 
            title: 'Episodes and Info', 
            iconType: 'feather',
            iconName: 'info',
            onPress: () => console.log('Navigating to Episode and Info'),
            show: true,
        },
        { 
            title: !status ? 'Download Episode' : status, 
            iconType: 'feather',
            iconName: (
                status !== 'Downloading' 
                    ? (status !== 'Downloaded' ? 'download' : 'check' ) 
                    : (status !== 'Paused' ? 'pause' : 'play')
            ),
            status,
            iconNameOnEnd: status === 'Downloaded' ? 'trash' : ( status === 'Downloading' ? 'pause' : null ),
            circularProgress: (
                <AnimatedCircularProgress
                    size={ 25 }
                    width={ 3 }
                    fill={ progress }
                    tintColor='#00e0ff'
                    backgroundColor='#3d5875' 
                />
            ),
            onPress: async () => status === 'Downloading' ? await pauseDownload() : (status === 'Paused' ? await resumeDownload() : await downloadVideo()),
            onPressEndIcon: async () => status === 'Downloading' ? await pauseDownload() : await deleteDownload(),
            show: true,
        },
        { 
            title: !findShowInUserRatedShows?.rate ? 'Like' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-up',
            isSolid: findShowInUserRatedShows?.rate === 'like',
            onPress: handleToggleLikeRecentlyWatchedShow,
            show: !findShowInUserRatedShows?.rate || findShowInUserRatedShows?.rate === 'like',
        },
        { 
            title: !findShowInUserRatedShows?.rate ? 'Not For Me' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-down',
            isSolid: findShowInUserRatedShows?.rate === 'not for me',
            onPress: handleToggleUnLikeRecentlyWatchedShow,
            show: !findShowInUserRatedShows?.rate || findShowInUserRatedShows?.rate === 'not for me',
        },
        {
            title: 'Remove From Row',
            iconType: 'font-awesome-5',
            iconName: 'ban',
            onPress: handlePressRemoveRecentlyWatchedShow,
            show: true,
        },
    ];


    const downloadProgressCallback = (downloadProgress) => {
        const progress = Math.round(((downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100));
        setProgress(progress);
        console.log(progress)
    };

    /** Working */
    const downloadVideo = async () => 
    {
        try {
            setStatus(VIDEO_STATUSES.DOWNLOADING);
            await downloadResumable.downloadAsync();
            setStatus(VIDEO_STATUSES.DOWNLOADED);
        } catch ({ message }) {
            setStatus(VIDEO_STATUSES.PAUSED);
            console.log(message);
        }
    }

    /** Working */
    const deleteDownload = async () => 
    {
        try {
            setStatus('');
            await FileSystem.deleteAsync(FILE_URI);
        } catch ({ message }) {
            console.log(message);
        }
    }

    /** Not Working */
    const pauseDownload = async () => 
    {
        try {
            console.log(`Paused at: ${ progress }%`)
            await downloadResumable.pauseAsync();
            AsyncStorage.setItem(selectedVideo.video, JSON.stringify(downloadResumable.savable()));
            setStatus(VIDEO_STATUSES.PAUSED);
        } catch ({ message }) {
            setStatus(VIDEO_STATUSES.PAUSED_FAILED);
            console.error(message);
        }
    }

    /** Not Working */
    const resumeDownload = async () => 
    {
        /** Extract */
        const downloadSnapshotJson = await AsyncStorage.getItem(selectedVideo.video);
        const { url, fileUri, options, resumeData } = JSON.parse(downloadSnapshotJson);
        const previousDownloadedFile = new FileSystem.DownloadResumable(url, fileUri, options, downloadProgressCallback, resumeData);

        try {
            setStatus(VIDEO_STATUSES.RESUMING_DOWNLOAD);
            await previousDownloadedFile.resumeAsync();
            setStatus(VIDEO_STATUSES.DOWNLOADED);
        } catch ({ message }) {
            console.error({ message });
        }
    }

    const checkIfFileExists = async () => 
    {
        try {
            const fileExists = await ensureFileExists(FILE_URI);

            if (fileExists.exists) {
                setStatus('Downloaded');
            }
        } catch ({ message }) {
            
        }
    }

    useEffect(() => {
        checkIfFileExists();
        if (!downloadResumable) {
            setDownloadResumable(FileSystem.createDownloadResumable(selectedVideo.video, FILE_URI, {}, downloadProgressCallback));
        }
    }, []);

    return (
        <BottomSheet isVisible={ isVisible } containerStyle={ styles.container }>
        {
            actionList.map((action, index) => action.show && (
                <DisplayAction key={ index } actionType={ action }/>
            ))
        }
        </BottomSheet>
    )
}


const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(MoreActionList)
