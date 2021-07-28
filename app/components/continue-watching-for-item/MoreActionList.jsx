import React, { useState, useEffect } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as FileSystem from 'expo-file-system'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TouchableOpacity, ToastAndroid } from 'react-native'
import { StatusBar } from 'expo-status-bar'

/** Dispatch Actions */
import * as AUTH_ACTION from './../../redux/modules/auth/actions'

/** Selectors */
import { authSelector, authProfileSelector } from './../../redux/modules/auth/selectors';

/** Styles */
import styles from './../../assets/stylesheets/moreActionList';

/** Components */
import DisplayAction from './DisplayAction';

/** RNE Components */
import { BottomSheet, Overlay } from 'react-native-elements';

/** Utils/Configs */
import VIDEO_STATUSES from './../../config/video.statuses';
import { ensureFileExists } from './../../utils/cacheImage';
import View from './../View';
import Text from './../Text';
import { useNavigation } from '@react-navigation/native';


const MoreActionList = ({
    AUTH,
    AUTH_PROFILE,
    selectedVideo,
    handlePressRemoveRecentlyWatchedShow,
    handleToggleLikeRecentlyWatchedShow,
    handleToggleUnLikeRecentlyWatchedShow,
    isVisible,
    setIsVisible
}) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ downloadResumable, setDownloadResumable ] = useState(null);
    const [ progress, setProgress ] = useState(0);
    const [ status, setStatus ] = useState('');
    const [ showDownloadedMenu, setShowDownloadedMenu ] = useState(false);

    const FILE_URI = `${ FileSystem.documentDirectory }Downloads-${ AUTH_PROFILE.id }${ selectedVideo.id }.mp4`;
    const ratedShow = AUTH_PROFILE.recently_watched_shows.find(({ id }) => id === selectedVideo.id);


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
                status === VIDEO_STATUSES.PAUSED // download is paused show PLAY button
                    ? 'play'
                    : (
                        status === VIDEO_STATUSES.DOWNLOADING // downloading show progress 
                            ? null
                            : (
                                status !== VIDEO_STATUSES.DOWNLOADED // not yet downloaded
                                    ? ( status === VIDEO_STATUSES.RESUMING_DOWNLOAD ? null : 'download' ) 
                                    : 'check' 
                            )
                    ) 
                    
            ),
            status,
            iconNameOnEnd: status === 'Downloading' ? 'pause' : null,
            circularProgress: (
                <AnimatedCircularProgress
                    size={ 25 }
                    width={ 3 }
                    fill={ progress }
                    tintColor='#00e0ff'
                    backgroundColor='#3d5875' 
                />
            ),
            onPress: () => (
                status !== VIDEO_STATUSES.DOWNLOADED 
                    ? status === 'Downloading' ? pauseDownload() : (status === 'Paused' ? resumeDownload() : downloadVideo())
                    : toggleOverlay()
            ),
            onPressEndIcon: () => status === 'Downloading' && pauseDownload(),
            show: true,
        },
        { 
            title: !ratedShow?.rate ? 'Like' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-up',
            isSolid: ratedShow?.rate === 'like',
            onPress: handleToggleLikeRecentlyWatchedShow,
            show: !ratedShow?.rate || ratedShow?.rate === 'like',
        },
        { 
            title: !ratedShow?.rate ? 'Not For Me' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-down',
            isSolid: ratedShow?.rate === 'not for me',
            onPress: handleToggleUnLikeRecentlyWatchedShow,
            show: !ratedShow?.rate || ratedShow?.rate === 'not for me',
        },
        {
            title: 'Remove From Row',
            iconType: 'font-awesome-5',
            iconName: 'ban',
            onPress: handlePressRemoveRecentlyWatchedShow,
            show: true,
        },
    ];

    const toggleOverlay = () => setShowDownloadedMenu(!showDownloadedMenu);

    const downloadProgressCallback = (downloadProgress) => {
        const progress = Math.round(((downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100));
        setProgress(progress);
    };

    const downloadVideo = async () => 
    {
        try {
            setStatus(VIDEO_STATUSES.DOWNLOADING);
            await downloadResumable.downloadAsync();
            setStatus(VIDEO_STATUSES.DOWNLOADED);

            ToastAndroid.show('Download Complete', ToastAndroid.SHORT);
            dispatch(AUTH_ACTION.downloadVideoStart({ show: { ...selectedVideo, downloaded_file_uri: FILE_URI, }, profile: AUTH.profile }));
        } catch ({ message }) {
            console.log(message);
        }
    }

    const deleteDownload = async () => 
    {
        try {
            setStatus('');
            toggleOverlay();
            await FileSystem.deleteAsync(FILE_URI);
            dispatch(AUTH_ACTION.removeToMyDownloadsStart(selectedVideo.id));
            ToastAndroid.show('Download Deleted', ToastAndroid.SHORT);
        } catch ({ message }) {
            // Do something
        }
    }

    const pauseDownload = async () => 
    {
        try {
            await downloadResumable.pauseAsync();
            AsyncStorage.setItem(selectedVideo.video, JSON.stringify(downloadResumable.savable()));
            setStatus(VIDEO_STATUSES.PAUSED);
            ToastAndroid.show('Download Paused', ToastAndroid.SHORT);
        } catch ({ message }) {
            setStatus(VIDEO_STATUSES.PAUSED_FAILED);
        }
    }

    const navigateToMyDownloads = () => {
        toggleOverlay();
        setIsVisible(false);
        navigation.navigate('Downloads');
    }

    const resumeDownload = async () => 
    {
        /** Extract */
        const downloadSnapshotJson = await AsyncStorage.getItem(selectedVideo.video);
        const { url, fileUri, options, resumeData } = JSON.parse(downloadSnapshotJson);

        const previousDownloadedFile = new FileSystem.DownloadResumable(url, fileUri, options, downloadProgressCallback, resumeData);

        try {
            setStatus(VIDEO_STATUSES.DOWNLOADING);
            await previousDownloadedFile.resumeAsync();
            setStatus(VIDEO_STATUSES.DOWNLOADED);
            dispatch(AUTH_ACTION.downloadVideoStart({ show: selectedVideo, profile: AUTH.profile }));
            ToastAndroid.show('Download Complete', ToastAndroid.SHORT);
        } catch ({ message }) {
            console.error({ message });
        }
    }

    const checkIfFileExists = () => {
        const fileExists = AUTH_PROFILE.my_downloads.findIndex(({ id }) => id === selectedVideo.id) !== -1;
        !fileExists ? setStatus('') : setStatus(VIDEO_STATUSES.DOWNLOADED);
    }

    useEffect(() => {
        if (!downloadResumable) {
            setDownloadResumable(FileSystem.createDownloadResumable(selectedVideo.video, FILE_URI, {}, downloadProgressCallback));
        }
        return () => {
            setDownloadResumable(null);
            setProgress(0);
            setShowDownloadedMenu(false);
            setStatus('');
        }
    }, []);

    useEffect(() => {
        checkIfFileExists();
    }, [AUTH_PROFILE.my_downloads])

    return (
        <View style={ styles.container }>
            
            { isVisible && <StatusBar backgroundColor='rgba(0, 0, 0, .7)' /> }
            <Overlay isVisible={ showDownloadedMenu } onBackdropPress={ toggleOverlay } overlayStyle={ styles.downloadedMenu }>
                <TouchableOpacity onPress={ deleteDownload }>
                    <Text style={ styles.deleteDownloadTitle }>Delete Download</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ navigateToMyDownloads }>
                    <Text style={ styles.viewMyDownloadsTitle }>View My Downloads</Text>
                </TouchableOpacity>
            </Overlay>
            <BottomSheet isVisible={ isVisible } containerStyle={ styles.bottomSheetContainer }>
            {actionList.map((action, index) => action.show && (
                <DisplayAction key={ index } actionType={ action }/>
            ))}
            </BottomSheet>
        </View>
    )
}


const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(MoreActionList)
