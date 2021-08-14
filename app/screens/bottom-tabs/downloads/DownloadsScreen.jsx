import React, { useState, useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { InteractionManager, Platform, StatusBar, TouchableOpacity, FlatList, ToastAndroid, ActivityIndicator } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as AUTH_ACTION from './../../../redux/modules/auth/actions';
import { authSelector, authProfileSelector } from './../../../redux/modules/auth/selectors';
import { Button, Overlay  } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../../../components/View';
import Text from './../../../components/Text';
import AppBar from '../../AppBar';
import VideoPlayerFullScreen from '../../../components/VideoPlayerFullScreen';
import DownloadItem from '../../../components/download-item/DownloadItem';
import styles from './../../../assets/stylesheets/downloads';
import { cacheImage } from './../../../utils/cacheImage';
import LoadingSpinner from './../../../components/LoadingSpinner';
import DownloadScreenLoader from '../../../components/loading-skeletons/DownloadScreenLoader';


const DownloadsScreen = ({ AUTH, AUTH_PROFILE }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ download, setDownload ] = useState(null);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ showVideo, setShowVideo ] = useState(false);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = (downloadedShow) => {
        setVisible(!visible);
        setDownload(downloadedShow);
    }

    const handlePressDeleteDownload = async () => 
    {
        try {
            const FILE_URI = `${ FileSystem.documentDirectory }Downloads-${ AUTH_PROFILE.id }${ download.id }.mp4`;

            await FileSystem.deleteAsync(FILE_URI);
            dispatch(AUTH_ACTION.removeToMyDownloadsStart(download.id));
            ToastAndroid.show('Download Deleted', ToastAndroid.SHORT);
            setVisible(false);
        } catch ({ message }) {
        }
    }

    const handlePressNonSeries = (downloadedShow) => {
        setShowVideo(true);
        setDownload(downloadedShow);
    }

    const handlePressSeries = (downloadedShow) => {
        const { id, title: headerTitle } = downloadedShow;
        navigation.navigate('MoreDownloads', { id, headerTitle });
    }

    const runAfterInteractions = () => {
        AUTH_PROFILE.my_downloads.map(({ id, poster_path, video_path }) => {
            cacheImage(poster_path, id, `${ AUTH_PROFILE.name }/Downloads/Posters/`);
            cacheImage(video_path, id, `${ AUTH_PROFILE.name }/Downloads/Videos/`);
        });
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);
        return () => {
            setDownload(null);
            setIsInteractionsComplete(false);
            setShowVideo(false);
            setVisible(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (AUTH_PROFILE.has_new_downloads) {
                dispatch(AUTH_ACTION.viewDownloadsStart());
            }

            return () => dispatch(AUTH_ACTION.viewDownloadsStart());
        }, [AUTH_PROFILE.has_new_downloads])
    );

    if (showVideo) {
        return (
            <VideoPlayerFullScreen 
                uri={ download.downloaded_file_uri }
                handleCloseVideo={ () => setShowVideo(false) }
            />
        )
    }

    return (
        <View style={ styles.container }>
            <Overlay isVisible={ visible } onBackdropPress={ toggleOverlay } overlayStyle={ styles.overlay }>
                {
                    AUTH.isLoading 
                        ? <ActivityIndicator color='#FFFFFF' />
                        : (
                            <>
                                <TouchableOpacity onPress={ () => setShowVideo(true) }>
                                    <Text style={ styles.overLayText }>Play</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ handlePressDeleteDownload }>
                                    <Text style={ styles.overLayText }>Delete Download</Text>
                                </TouchableOpacity>
                            </>
                        )
                }
            </Overlay>

            <AppBar 
                marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } 
                showLogo={ false } 
                headerTitle='Downloads'
            />

            <View style={ styles.headerContainer }>
                <Text h4>Download's for you</Text>
                <View style={ styles.lastUpdateContainer }>
                    <FeatherIcon 
                        name='clock'
                        size={ 14 }
                        color='#fff'
                        style={ styles.lastUpdateIcon }
                    />
                    <Text style={ styles.lastUpdateText }>Updated 7 hours ago</Text>
                </View>
            </View>

            {
                !isInteractionsComplete
                    ? <DownloadScreenLoader />
                    : (
                        <FlatList 
                            keyExtractor={ ({ id }) => id.toString() }
                            data={ AUTH_PROFILE.my_downloads }
                            renderItem={ ({ item }) => (
                                <DownloadItem 
                                    downloadedVideo={ item } 
                                    onLongPress={ () => toggleOverlay(item) }
                                    handlePressNonSeries={ () => handlePressNonSeries(item) }
                                    handlePressSeries={ () => handlePressSeries(item) }
                                />
                            )}
                            showsHorizontalScrollIndicator={ false }
                            showsVerticalScrollIndicator={ false }
                        />
                    )
            }
                
            <View style={ styles.queryContainer }>
                <Button 
                    title='Find Something to Download'
                    titleStyle={ styles.queryBtnTitle }
                    buttonStyle={ styles.queryBtn }
                />
            </View>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(DownloadsScreen)
