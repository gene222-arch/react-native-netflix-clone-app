import React from 'react'
import View from './../View';
import Text from './../Text';
import Image from './../Image';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native';
import styles from './../../assets/stylesheets/downloadItem';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { getCachedFile } from './../../utils/cacheImage';


const DownloadItem = ({ downloadedVideo, onLongPress, handlePressNonSeries, handlePressSeries }) => 
{
    return (
        <TouchableOpacity onLongPress={ onLongPress }>
            <View style={ styles.container }>
                <View row={ true } justifyContent='space-between' alignItems='center' padding={ 2 }>
                    <View>
                        <Image 
                            source={{ uri: getCachedFile('Downloads/Posters/', downloadedVideo.id, downloadedVideo.poster) }}
                            style={ styles.posterImg }
                        />
                    </View>
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.title }>{ downloadedVideo.title }</Text>
                        <Text style={ styles.duration }>
                            { `Episode ${downloadedVideo.episode} | ${ downloadedVideo.size }` }
                        </Text>
                    </View>
                    {
                        (downloadedVideo.total_number_of_episodes === 1)
                            ? (
                                <TouchableNativeFeedback onPress={ handlePressNonSeries }>
                                    <FeatherIcon
                                        name='film'
                                        size={ 20 }
                                        color='#fff'
                                    />
                                </TouchableNativeFeedback>
                            )
                            : (
                                <TouchableNativeFeedback onPress={ handlePressSeries }>
                                    <FeatherIcon
                                        name='chevron-right'
                                        size={ 20 }
                                        color='#fff'
                                    />
                                </TouchableNativeFeedback>
                            )
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DownloadItem
