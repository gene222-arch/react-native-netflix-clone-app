import React from 'react'
import { FlatList } from 'react-native'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import styles from './../../../../assets/stylesheets/trailerInfo';
import VideoPlayer from './../../../../components/VideoPlayer';

const TrailersAndMore = ({ trailers }) => 
{
    return (
        <FlatList 
            keyExtractor={ ({ id }) => id.toString() }
            data={ trailers }
            renderItem={ ({ item }) => (
                <View style={ styles.trailersAndMoreContainer }>
                    <VideoPlayer videoPath={ item.video_path } posterPath={ item.poster_path } shouldShowPoster={ true } />
                    <Text style={ styles.trailerTitle }>{ item.title }</Text>
                </View>
            )}
            ListEmptyComponent={
                <View style={ styles.moreLikeThisEmptyMessageContainer }>
                    <Text h4 style={ styles.trailersAndMoreEmptyMessage }>Coming Soon</Text>
                </View>
            }
        />
    )
}

export default TrailersAndMore
