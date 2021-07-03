import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { InteractionManager, Platform, StatusBar } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

/** API */

/** RNE Components */
import { Button, Overlay  } from 'react-native-elements';

/** RNE Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';

/** Components */
import View from './../../../components/View';
import Text from './../../../components/Text';
import VideoPlayerFullScreen from '../../../components/VideoPlayerFullScreen';
import DownloadItem from '../../../components/download-item/DownloadItem';

/** Styles */
import styles from './../../../assets/stylesheets/downloads';
import { cacheImage, getCachedFile } from './../../../utils/cacheImage';
import AppBar from '../../AppBar';
import { createStructuredSelector } from 'reselect';
import { authSelector, authProfileSelector } from './../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import LoadingScreen from './../../../components/LoadingScreen';


const DownloadsScreen = ({ AUTH, AUTH_PROFILE }) => 
{
    console.log(AUTH_PROFILE);
    const navigation = useNavigation();

    const [ download, setDownload ] = useState(null);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ showVideo, setShowVideo ] = useState(false);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = (downloadedShow) => {
        setVisible(!visible);
        setDownload(downloadedShow);
    }

    const handlePressDeleteDownload = () => {
        setVisible(false);
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
                setShowVideo={ setShowVideo }
            />
        )
    }

    return (
        <View style={ styles.container }>
            <Overlay isVisible={ visible } onBackdropPress={ toggleOverlay } overlayStyle={ styles.overlay }>
                <Text 
                    style={ styles.overLayText } 
                    touchableFeedback={ true }
                    onPress={ () => console.log('Play') }
                >
                    Play
                </Text>
                <Text 
                    style={ styles.overLayText } 
                    touchableFeedback={ true }
                    onPress={ handlePressDeleteDownload }
                >
                    Delete Download
                </Text>
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
