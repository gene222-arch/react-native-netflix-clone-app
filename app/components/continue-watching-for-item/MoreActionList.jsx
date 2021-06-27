import React, { useState, useEffect } from 'react'
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
            iconNameOnEnd: status === 'Downloaded' ? 'trash' : null,
            circularProgress: (
                <AnimatedCircularProgress
                    size={ 25 }
                    width={ 3 }
                    fill={ progress }
                    tintColor='#00e0ff'
                    backgroundColor='#3d5875' 
                />
            ),
            onPress: () => status === 'Downloading' ? pauseDownload() : (status === 'Paused' ? resumeDownload() : downloadVideo()),
            onPressEndIcon: () => deleteDownload(),
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


    /** Download  */
    const downloadProgressCallback = (downloadProgress) => {
        const progress = Math.round(((downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100));
        setProgress(progress);
        console.log(progress)
    };

    const downloadResumable = FileSystem.createDownloadResumable(
        selectedVideo.video,
        FILE_URI,
        {
            sessionType: FileSystem.FileSystemSessionType.BACKGROUND
        },
        downloadProgressCallback
    );

    const downloadVideo = async () => 
    {
        try {
            setStatus(VIDEO_STATUSES.DOWNLOADING);
            await downloadResumable.downloadAsync();
            setStatus(VIDEO_STATUSES.DOWNLOADED);
        } catch ({ message }) {
            setStatus(VIDEO_STATUSES.DOWNLOAD_FAILED);
        }
    }

    const deleteDownload = async () => 
    {
        try {
            setStatus('');
            await FileSystem.deleteAsync(FILE_URI);
        } catch ({ message }) {
            console.log(message);
        }
    }

    const pauseDownload = async () => 
    {
        try {
            console.log(`Paused ${ progress } %`)
            setStatus(VIDEO_STATUSES.PAUSED);

            await downloadResumable.pauseAsync();
            asyncStorage.setItem(selectedVideo.video, JSON.stringify(downloadResumable.savable()));
        } catch ({ message }) {
            setStatus(VIDEO_STATUSES.PAUSED_FAILED);
            console.error(message);
        }
    }

    const resumeDownload = async () => 
    {
        /** Extract */
        const downloadSnapshotJson = await asyncStorage.getItem(selectedVideo.video);
        const { url, fileUri, options, resumeData } = JSON.parse(downloadSnapshotJson);
        const downloadResumable = new FileSystem.DownloadResumable(url, fileUri, options, downloadProgressCallback, resumeData);

        try {
            setStatus(VIDEO_STATUSES.RESUMING_DOWNLOAD);
            await downloadResumable.resumeAsync();
        } catch ({ message }) {
            console.error({ message });
        }
    }

    const checkIfFileExists = async () => 
    {
        try {
            const fileExists = await ensureFileExists(FILE_URI);

            if (fileExists.exists) {
                console.log(`${ FILE_URI } exists`);
                setStatus('Downloaded');
            }
        } catch ({ message }) {
            
        }
    }

    useEffect(() => {
        checkIfFileExists();
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
