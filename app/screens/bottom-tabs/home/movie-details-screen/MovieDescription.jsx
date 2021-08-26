import React from 'react'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import styles from './../../../../assets/stylesheets/movieDetail';
import MostLikedBadge from '../../../../components/MostLikedBadge';

const MovieDescription = ({ movie }) => 
{
    const { plot, casts, directors } = movie;

    return (
        <View style={ styles.movieDescriptionContainer }>
            <Text style={ styles.plot }>{ plot }</Text>
            <View style={ styles.castCreatorContainer }>
                <Text style={ styles.cast }>Cast: { casts }</Text>
                <Text style={ styles.creator }>Creator: { directors }</Text>
            </View>
            <MostLikedBadge movieId={ movie.id } />
        </View>
    )
}

export default MovieDescription
