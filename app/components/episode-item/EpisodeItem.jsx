import React from 'react'
import View from './../View';
import Text from './../Text';
import styles from './../../assets/stylesheets/episodeItem';
import Image from './../Image';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Pressable } from 'react-native';

const EpisodeItem = ({ movie, onPress }) => 
{
    const { poster_path, title, duration, plot } = movie;

    return (
        <Pressable onPress={ onPress }>
            <View style={ styles.container }>
                <View row={ true } justifyContent='space-between' alignItems='center' padding={ 2 }>
                    <Image 
                        source={{
                            uri: poster_path
                        }}
                        style={ styles.posterImg }
                    />
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.title }>{ title }</Text>
                        <Text style={ styles.duration }>{ duration }</Text>
                    </View>
                    <FeatherIcon
                        name='download'
                        size={ 24 }
                        color='#fff'
                    />
                </View>
                <Text style={ styles.plot }>{ plot }</Text>
            </View>
        </Pressable>
    )
}

export default EpisodeItem
