import React, { useState } from 'react'
import { BottomSheet } from 'react-native-elements';
import styles from './../../assets/stylesheets/moreActionList';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as AUTH_ACTION from './../../redux/modules/auth/actions'
import { authSelector } from './../../redux/modules/auth/selectors';
import * as FileSystem from 'expo-file-system'
import * as asyncStorage from './../../utils/asyncStorage'
import DisplayAction from './DisplayAction';
import { getExtension } from './../../utils/file';
import Text from './../Text';


const MoreActionList = ({ AUTH, selectedVideo, handlePressRemoveRecommendation, handleToggleLikeRecommendation, handleToggleUnLikeRecommendation, isVisible, setIsVisible }) => 
{
    const FILE_URI = `${ FileSystem.documentDirectory }${ selectedVideo.title }${ selectedVideo.id }.${ getExtension(selectedVideo.video) }`;
    const currentSelectedVideoIsRated = !(selectedVideo.rate === 'like' || selectedVideo.rate === 'not for me');

    const [ status, setStatus ] = useState('');
    const [ progress, setProgress ] = useState(0);

    const actionList = 
    [
        {
            title: selectedVideo.title,
            titleStyle: styles.moreActionHeader,
            iconNameOnEnd: 'x-circle',
            iconType: 'feather',
            containerStyle: styles.moreActionHeaderContainer,
            onPressEndIcon: () => setIsVisible(false),
            show: true,
        },
        { 
            title: 'Episodes and Info', 
            iconName: 'info',
            iconType: 'feather',
            onPress: () => console.log('Navigating to Episode and Info'),
            show: true,
        },
        { 
            title: !status ? 'Download Episode' : status, 
            iconName: (
                status !== 'Downloading' 
                    ? (status !== 'Downloaded' ? 'download' : 'check' ) 
                    : (status !== 'Paused' ? 'pause' : 'play')
            ),
            iconType: 'feather',
            iconNameOnEnd: status === 'Downloaded' ? 'trash' : null,
            onPressEndIcon: () => deleteDownload(),
            onPress: () => status === 'Downloading' ? pauseDownload() : (status === 'Paused' ? resumeDownload() : downloadVideo()),
            show: true,
        },
        { 
            title: currentSelectedVideoIsRated ? 'Like' : 'Rated', 
            iconName: 'thumbs-up',
            iconType: 'font-awesome-5',
            isSolid: selectedVideo.rate === 'like',
            onPress: handleToggleLikeRecommendation,
            show: !selectedVideo.rate || selectedVideo.rate === 'like',
        },
        { 
            title: currentSelectedVideoIsRated ? 'Not For Me' : 'Rated', 
            iconName: 'thumbs-down',
            iconType: 'font-awesome-5',
            isSolid: selectedVideo.rate === 'not for me',
            onPress: handleToggleUnLikeRecommendation,
            show: !selectedVideo.rate || selectedVideo.rate === 'not for me',
        },
        {
            title: 'Remove From Row',
            iconName: 'ban',
            iconType: 'font-awesome-5',
            onPress: handlePressRemoveRecommendation,
            show: true,
        },
    ];

    /** Download  */
    const downloadProgressCallback = downloadProgress => {
        const progress = Math.round(((downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100));
        setProgress(progress);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
        selectedVideo.video,
        FILE_URI,
        {},
        downloadProgressCallback
    );

    const downloadVideo = async () => 
    {
        try {
            console.log(`Downloading ${ selectedVideo.title }`);
            setStatus('Downloading');
            await downloadResumable.downloadAsync();
            console.log(`Downloaded ${ selectedVideo.title }`);
            setStatus('Downloaded');
        } catch ({ message }) {
            console.log({ message });
            setStatus('Download Failed');
        }
    }

    const deleteDownload = async() => 
    {
        try {
            await FileSystem.deleteAsync(FILE_URI);
            setStatus('');
            console.log(`${ FILE_URI } deleted`);
        } catch ({ message }) {
            console.log(message);
        }
    }

    const pauseDownload = async() => 
    {
        try {
            console.log(`Paused ${ progress } %`)
            setStatus('Paused');
            await downloadResumable.pauseAsync();
            asyncStorage.setItem(selectedVideo.video, JSON.stringify(downloadResumable.savable()));
        } catch ({ message }) {
            setStatus('Error on Paused');
            console.error(e);
        }
    }

    const resumeDownload = async () => 
    {
        const downloadSnapshotJson = await asyncStorage.getItem(selectedVideo.video);
        const downloadSnapshot = JSON.parse(downloadSnapshotJson);
        const downloadResumable = new FileSystem.DownloadResumable(
            downloadSnapshot.url,
            downloadSnapshot.fileUri,
            downloadSnapshot.options,
            downloadProgressCallback,
            downloadSnapshot.resumeData
        );

        try {
            const { uri } = await downloadResumable.resumeAsync();
            console.log('Finished downloading to ', uri);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <BottomSheet
            isVisible={ isVisible }
            containerStyle={ styles.container }
        >
            {actionList.map((action, i) => action.show && (
                <DisplayAction key={ i } actionType={ action }/>
            ))}
        </BottomSheet>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(MoreActionList)
