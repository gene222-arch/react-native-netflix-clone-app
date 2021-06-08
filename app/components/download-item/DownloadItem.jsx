import React from 'react'
import View from './../View';
import Text from './../Text';
import Image from './../Image';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native';
import styles from './../../assets/stylesheets/downloadItem';

const DownloadItem = ({ downloadedVideo, onPress }) => 
{
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ styles.container }>
                <View row={ true } justifyContent='space-between' alignItems='center' padding={ 2 }>
                    <View>
                        <Image 
                            source={{
                                uri: downloadedVideo.poster
                            }}
                            style={ styles.posterImg }
                        />
                        <FeatherIcon 
                            name='play-circle' 
                            size={ 20 } 
                            color='#fff' 
                            style={ styles.imagePosterIcon }
                        />
                    </View>
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.title }>{ downloadedVideo.title }</Text>
                        <Text style={ styles.duration }>
                            { `Episode ${downloadedVideo.episode} | ${ downloadedVideo.size }` }
                        </Text>
                    </View>
                    <FeatherIcon
                        name={ !downloadedVideo.isFinished ? 'loader' : 'chevron-right' }
                        size={ 20 }
                        color='#fff'
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DownloadItem
