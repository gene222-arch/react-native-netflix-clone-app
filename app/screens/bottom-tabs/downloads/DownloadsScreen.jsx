import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

/** API */
import downloadsAPI from './../../../services/data/downloads';

/** RNE Components */
import { Button, Overlay  } from 'react-native-elements';

/** RNE Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';

/** Components */
import View from './../../../components/View';
import Text from './../../../components/Text';
import PlayDownloadScreen from './PlayDownloadScreen';
import DownloadItem from '../../../components/download-item/DownloadItem';

/** Styles */
import styles from './../../../assets/stylesheets/downloads';


const DownloadsScreen = () => 
{
    const navigation = useNavigation();

    const [ download, setDownload ] = useState(null);
    const [ downloads, setDownloads ] = useState(downloadsAPI);
    const [ showVideo, setShowVideo ] = useState(false);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = (downloadData) => {
        setVisible(!visible);
        setDownload(downloadData);
    }

    const handlePressDeleteDownload = () => {
        setDownloads(downloads.filter(({ id }) => id !== download.id));
        setVisible(false);
    }

    const handlePressNonSeries = (downloadData) => {
        setShowVideo(true);
        setDownload(downloadData);
    }

    const handlePressSeries = (downloadData) => {
        navigation.navigate('MoreDownloads', {
            id: downloadData.id, 
            headerTitle:  downloadData.title
        });
    }

    if (showVideo) {
        return (
            <View>
                <PlayDownloadScreen uri={ download.video } setShowVideo={ setShowVideo }/>
            </View>
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
            <View>
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
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ downloads }
                renderItem={ ({ item }) => (
                    <DownloadItem 
                        downloadedVideo={ item } 
                        onLongPress={ () => toggleOverlay(item) }
                        showType={ item.show_type }
                        handlePressNonSeries={ () => handlePressNonSeries(item) }
                        handlePressSeries={ () => handlePressSeries(item) }
                    />
                )}
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

export default DownloadsScreen
