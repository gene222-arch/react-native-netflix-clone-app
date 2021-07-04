import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { InteractionManager, Platform, StatusBar, TouchableOpacity, FlatList, ToastAndroid, ActivityIndicator } from 'react-native'
import * as FileSystem from 'expo-file-system'

/** API */

/** Actions */
import * as AUTH_ACTION from './../../../redux/modules/auth/actions';

/** Selectors */
import { authSelector, authProfileSelector } from './../../../redux/modules/auth/selectors';

/** RNE Components */
import { Button, Overlay  } from 'react-native-elements';

/** RNE Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';

/** Components */
import View from './../../../components/View';
import Text from './../../../components/Text';
import AppBar from '../../AppBar';
import VideoPlayerFullScreen from '../../../components/VideoPlayerFullScreen';
import DownloadItem from '../../../components/download-item/DownloadItem';
import LoadingScreen from './../../../components/LoadingScreen';

/** Styles */
import styles from './../../../assets/stylesheets/downloads';

/** Utils */
import { cacheImage, getCachedFile } from './../../../utils/cacheImage';


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
            console.log('DELETING DOWNLOAD');
            const FILE_URI = `${ FileSystem.documentDirectory }Downloads-${ AUTH_PROFILE.id }${ download.id }.mp4`;

            await FileSystem.deleteAsync(FILE_URI);
            dispatch(AUTH_ACTION.removeToMyDownloadsStart(download.id));
            ToastAndroid.show('Download Deleted', ToastAndroid.SHORT);
            setVisible(false);
        } catch ({ message }) {
            // Do something
        }
    }

    const handlePressNonSeries = (downloadedShow) => {
        navigation.setParams({ showSetInFullScreen: true });
        setShowVideo(true);
        setDownload(downloadedShow);
    }

    const handlePressSeries = (downloadedShow) => {
        const { id, title: headerTitle } = downloadedShow;
        navigation.navigate('MoreDownloads', { id, headerTitle });
    }

    const runAfterInteractions = () => {
        AUTH_PROFILE.my_downloads.map(({ id, poster, video }) => {
            cacheImage(poster, id, `${ AUTH_PROFILE.name }/Downloads/Posters/`);
            cacheImage(video, id, `${ AUTH_PROFILE.name }/Downloads/Videos/`);
        });
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setDownload(null);
        setIsInteractionsComplete(false);
        setShowVideo(false);
        setVisible(false);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            cleanUp();
        }
    }, []);


    /** Show Loading */
    if (!isInteractionsComplete) {
        return <LoadingScreen />
    }
    
    /** Play Video in Full Screen */
    if (showVideo) 
    {
        return (
            <VideoPlayerFullScreen 
                uri={ getCachedFile('Downloads/Videos/', download.id, download.video) }
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

            {/* App bar */}
            <AppBar 
                marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } 
                showLogo={ false } 
                headerTitle='Downloads'
            />

            {/* Header */}
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

            {/* Downloads */}
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
