import React from 'react'
import View from './../View';
import Text from './../Text';
import styles from './../../assets/stylesheets/notificationsVideoItem';

const DisplayGenres = ({ genreLength, genreName, index }) => {
    return (
        <Text style={ styles.tags }>
            { (genreLength - 1) === index ? genreName : `${ genreName }  ·  ` }
        </Text>
    )
}

const ComingSoonMovieDetails = ({ movie }) => 
{
    return (
        <View style={ styles.videoInfo }>
            <Text style={ styles.additionalInfoText }>{ movie.additional_trailer }</Text>
            <Text style={ styles.title }>{ movie.title }</Text>
            <Text style={ styles.plot }>{ movie.plot }</Text>
            <View style={ styles.tagsContainer }>
            {
                movie.genres.split(',').map((genre, index) => (
                    <DisplayGenres 
                        key={ index } 
                        genreLength={ movie.genres.length }
                        genreName={ genre }
                        index={ index }
                    />
                ))
            }
            </View>
        </View>
    )
}

export default ComingSoonMovieDetails
