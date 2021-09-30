import React from 'react'
import View from './../View';
import Text from './../Text';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native';
import styles from './../../assets/stylesheets/downloadItem';
import { TouchableNativeFeedback } from 'react-native-gesture-handler'; 
import { Image } from 'react-native-expo-image-cache';


const DownloadItem = ({ movie, onLongPress, handlePressPlay }) => 
{
    return (
        <TouchableOpacity onLongPress={ onLongPress } onPress={ handlePressPlay }>
            <View style={ styles.container }>
                <View row={ true } justifyContent='space-between' alignItems='center' padding={ 2 }>
                    <View>
                        <Image
                            uri={ movie.movie.wallpaper_path }
                            preview={{ uri: movie.movie.wallpaper_path }}
                            style={ styles.posterImg }
                        />
                    </View>
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.title }>{ movie.movie.title }</Text>
                        <Text style={ styles.duration }>{ parseFloat(movie.movie.video_size_in_mb).toFixed(2) } mb</Text>
                    </View>
                    <TouchableNativeFeedback onPress={ handlePressPlay }>
                        <FeatherIcon
                            name='film'
                            size={ 20 }
                            color='#fff'
                        />
                    </TouchableNativeFeedback>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DownloadItem
