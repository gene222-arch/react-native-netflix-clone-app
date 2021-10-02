import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import { BottomSheet, Overlay } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TouchableOpacity, ToastAndroid } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as FileSystem from 'expo-file-system'
import * as AUTH_ACTION from './../../redux/modules/auth/actions'
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import styles from './../../assets/stylesheets/moreActionList';
import DisplayAction from './DisplayAction';
import VIDEO_STATUSES from './../../config/video.statuses';
import View from './../View';
import Text from './../Text';
import { useFocusEffect } from '@react-navigation/core';


const downloadIconName = (status) => 
{
    let label = null;

    switch (status) 
    {
        case VIDEO_STATUSES.PAUSED:
            label = 'play';
            break;

        case VIDEO_STATUSES.DOWNLOADING:
        case VIDEO_STATUSES.RESUMING_DOWNLOAD:
            label = null;
            break;

        case VIDEO_STATUSES.DOWNLOADED:
            label = 'check';
            break;

        default:
            label = 'download';
            break;
    }

    return label;
}

const MoreActionList = ({ AUTH, AUTH_PROFILE, selectedVideo, handlePressRemove, handleToggleLike, handleToggleDisLike, handlePressRemoveRate, isVisible, setIsVisible }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ downloadResumable, setDownloadResumable ] = useState(null);
    const progress = useRef(0);
    const [ status, setStatus ] = useState('');
    const [ showDownloadedMenu, setShowDownloadedMenu ] = useState(false);

    const FILE_URI = `${ FileSystem.documentDirectory }${AUTH.id}${ AUTH_PROFILE.id }${ selectedVideo.id }.mp4`;
    const getMovieRatingDetails = selectedVideo.user_ratings[0];

    const handlePressNavigateToShowDetailScreen = () => navigation.navigate('MovieDetailScreen', { 
        id: selectedVideo?.id,
        headerTitle: selectedVideo?.title
    });

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
            onPress: () => handlePressNavigateToShowDetailScreen(),
            show: true,
        },
        { 
            title: !status ? 'Download Episode' : status, 
            iconType: 'feather',
            iconName: downloadIconName(status),
            status,
            iconNameOnEnd: status === 'Downloading' ? 'pause' : null,
            circularProgress: (
                <AnimatedCircularProgress
                    size={ 20 }
                    width={ 3 }
                    fill={ progress.current }
                    tintColor='#00e0ff'
                    backgroundColor='#3d5875' 
                />
            ),
            onPress: () => (
                status !== VIDEO_STATUSES.DOWNLOADED 
                    ? status === 'Downloading' ? pauseDownload() : (status === 'Paused' ? resumeDownload() : downloadVideo())
                    : toggleShowDownloadedMenu()
            ),
            onPressEndIcon: () => status === 'Downloading' && pauseDownload(),
            show: true,
        },
        { 
            title: !getMovieRatingDetails?.rate ? 'Like' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-up',
            isSolid: getMovieRatingDetails?.rate === 'like',
            onPress: () => !getMovieRatingDetails?.rate ? handleToggleLike() : handlePressRemoveRate(),
            show: !getMovieRatingDetails?.rate || getMovieRatingDetails?.rate === 'like',
        },
        { 
            title: !getMovieRatingDetails?.rate ? 'Not For Me' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-down',
            isSolid: getMovieRatingDetails?.rate === 'dislike',
            onPress: () => !getMovieRatingDetails?.rate ? handleToggleDisLike() : handlePressRemoveRate(),
            show: !getMovieRatingDetails?.rate || getMovieRatingDetails?.rate === 'dislike',
        },
        {
            title: !AUTH.isLoading ? 'Remove From Row' : 'Removing from row...',
            iconType: 'font-awesome-5',
            iconName: 'ban',
            onPress: () => handlePressRemove(),
            show: true,
        },
    ];

    const downloadProgressCallback = (downloadProgress) => {
        const progressDownload = Math.round(((downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100));
        progress.current = progressDownload;
    };

    const downloadVideo = async () => 
    {
        try {
            setStatus(VIDEO_STATUSES.DOWNLOADING);
            await downloadResumable.downloadAsync();
            setStatus(VIDEO_STATUSES.DOWNLOADED);

            dispatch(AUTH_ACTION.downloadVideoStart({ 
                movie: selectedVideo, 
                downloaded_file_uri: FILE_URI,
                profile: AUTH_PROFILE 
            }));

            ToastAndroid.show('Download Complete', ToastAndroid.SHORT);
        } catch ({ message }) {
            console.log(message);
        }
    }

    const deleteDownload = async () => 
    {
        try {
            setStatus('');
            toggleShowDownloadedMenu();

            dispatch(AUTH_ACTION.removeToMyDownloadsStart({
                user_profile_id: AUTH_PROFILE.id,
                movie_id: selectedVideo.id
            }));
            
            await FileSystem.deleteAsync(FILE_URI);

            ToastAndroid.show('Download Deleted', ToastAndroid.SHORT);
        } catch ({ message }) {
        }
    }

    const pauseDownload = async () => 
    {
        try {
            await downloadResumable.pauseAsync();

            AsyncStorage.setItem(selectedVideo.video_path, JSON.stringify(downloadResumable.savable()));

            setStatus(VIDEO_STATUSES.PAUSED);

            ToastAndroid.show('Download Paused', ToastAndroid.SHORT);
        } catch ({ message }) {
            setStatus(VIDEO_STATUSES.PAUSED_FAILED);
        }
    }

    const navigateToMyDownloads = () => 
    {
        toggleShowDownloadedMenu();
        setIsVisible(false);
        navigation.navigate('Downloads');
    }

    const resumeDownload = async () => 
    {
        try {
            const downloadSnapshotJson = await AsyncStorage.getItem(selectedVideo.video_path);
            const { url, fileUri, options, resumeData } = JSON.parse(downloadSnapshotJson);

            const previousDownloadedFile = new FileSystem.DownloadResumable(url, fileUri, options, downloadProgressCallback, resumeData);

            setStatus(VIDEO_STATUSES.DOWNLOADING);

            await previousDownloadedFile.resumeAsync();

            setStatus(VIDEO_STATUSES.DOWNLOADED);

            dispatch(AUTH_ACTION.downloadVideoStart({
                user_profile_id: AUTH_PROFILE.id,
                movie_id: selectedVideo.id
            }));

            ToastAndroid.show('Download Complete', ToastAndroid.SHORT);
        } catch ({ message }) {
            console.error({ message });
        }
    }

    const toggleShowDownloadedMenu = () => setShowDownloadedMenu(!showDownloadedMenu);

    const checkIfFileExists = () => 
    {
        const fileExists = Boolean(AUTH_PROFILE.my_downloads.find(download => download?.movie?.id === selectedVideo.id));
        
        !fileExists 
            ? setStatus('') 
            : setStatus(VIDEO_STATUSES.DOWNLOADED);
    }

    useFocusEffect(
        useCallback(() => {
            setDownloadResumable(FileSystem.createDownloadResumable(selectedVideo.video_path, FILE_URI, {}, downloadProgressCallback));

            return () => {
                setDownloadResumable(null);
                progress.current = 0;
                setShowDownloadedMenu(false);
                setStatus('');
            }
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            checkIfFileExists();
        }, [AUTH_PROFILE.recenly_watched_movies])
    )

    return (
        <View style={ styles.container }>

            { isVisible && <StatusBar backgroundColor='rgba(0, 0, 0, .7)' /> }

            <Overlay isVisible={ showDownloadedMenu } onBackdropPress={ toggleShowDownloadedMenu } overlayStyle={ styles.downloadedMenu }>
                <TouchableOpacity onPress={ deleteDownload }>
                    <Text style={ styles.deleteDownloadTitle }>Delete Download</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ navigateToMyDownloads }>
                    <Text style={ styles.viewMyDownloadsTitle }>View My Downloads</Text>
                </TouchableOpacity>
            </Overlay>

            <BottomSheet isVisible={ isVisible } containerStyle={ styles.bottomSheetContainer }>
            {
                actionList.map((action, index) => action.show && <DisplayAction key={ index } isLoading={ AUTH.isLoading } actionType={ action }/> )
            }
            </BottomSheet>
        </View>
    )
}


const mapStateToProps = createStructuredSelector({
    AUTH: authProfileSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(MoreActionList)
