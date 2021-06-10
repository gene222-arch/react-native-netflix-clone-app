import React from 'react'
import View from './../View';
import Text from './../Text';
import { FlatList } from 'react-native-gesture-handler';
import styles from './../../assets/stylesheets/moreDownloads';
import DownloadEpisodeItem from './../download-episode-item/index';

const MoreDownloadsSeason = ({ season, onPress }) => 
{
    return (
        <View style={ styles.seasonContainer }>
            <Text style={ styles.seasonName }>{ season.name }</Text>
            <FlatList 
                data={ season.episodes }
                renderItem={ ({ item }) => <DownloadEpisodeItem episode={ item } onPress={ () => onPress(item) }/> }
            />
        </View>
    )
}

export default MoreDownloadsSeason
