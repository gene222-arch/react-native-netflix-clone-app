import React from 'react'
import View from './../View';
import Text from './../Text';
import styles from './../../assets/stylesheets/episodeItem';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Pressable } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import MostLikedBadge from '../MostLikedBadge';

const EpisodeItem = ({ number, movie, onPress }) => 
{
    const { wallpaper_path, title, plot, duration_in_minutes } = movie;

    return (
        <Pressable onPress={ onPress }>
            <View style={ styles.container }>
                <View row={ true } alignItems='center' padding={ 2 }>
                    <Image 
                        uri={ wallpaper_path }
                        style={ styles.posterImg }
                    />
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.title }>{ `${ number }. ${ title }` }</Text>
                        <Text style={ styles.duration }>{ duration_in_minutes }m</Text>
                    </View>
                </View>
                <MostLikedBadge movieId={ movie.id } />
                <Text style={ styles.plot }>{ plot }</Text>
            </View>
        </Pressable>
    )
}

export default EpisodeItem
