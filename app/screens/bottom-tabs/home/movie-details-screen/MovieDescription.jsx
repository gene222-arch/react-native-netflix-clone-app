import React from 'react'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import styles from './../../../../assets/stylesheets/movieDetail';

const MovieDescription = ({ movie }) => 
{
    const { plot, cast, creator } = movie;

    return (
        <View style={ styles.movieDescriptionContainer }>
            <Text style={ styles.plot }>{ plot }</Text>
            <View style={ styles.castCreatorContainer }>
                <Text style={ styles.cast }>Cast: { cast }</Text>
                <Text style={ styles.creator }>Creator: { creator }</Text>
            </View>
        </View>
    )
}

export default MovieDescription
