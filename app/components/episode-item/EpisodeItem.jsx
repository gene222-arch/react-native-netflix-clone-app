import React from 'react'
import View from './../View';
import Text from './../Text';
import styles from './../../assets/stylesheets/episodeItem';
import Image from './../Image';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Pressable } from 'react-native';

const EpisodeItem = ({ episode, onPress }) => 
{
    return (
        <Pressable onPress={ onPress }>
            <View style={ styles.container }>
                <View row={ true } justifyContent='space-between' alignItems='center' padding={ 2 }>
                    <Image 
                        source={{
                            uri: episode.poster
                        }}
                        style={ styles.posterImg }
                    />
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.title }>{ episode.title }</Text>
                        <Text style={ styles.duration }>{ episode.duration }</Text>
                    </View>
                    <FeatherIcon
                        name='download'
                        size={ 24 }
                        color='#fff'
                    />
                </View>
                <Text style={ styles.plot }>{ episode.plot }</Text>
            </View>
        </Pressable>
    )
}

export default EpisodeItem
