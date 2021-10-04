import React, { useState, useCallback } from 'react'
import { InteractionManager, ActivityIndicator, StyleSheet, View } from 'react-native'
import { createStructuredSelector } from 'reselect';
import { movieSelector } from './../redux/modules/movie/selectors';
import { connect } from 'react-redux';
import { Badge } from 'react-native-elements/dist/badge/Badge';
import Text from './Text';
import Colors from './../constants/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

const MostLikedBadge = ({ MOVIE, movieId = 0 }) => 
{
    const [ isMostLiked, setIsMostLiked ] = useState(false);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    useFocusEffect(
        useCallback(() => {
            InteractionManager.runAfterInteractions(() => {
                const isMovieMostLiked = MOVIE.most_liked_movies.find(({ id }) => id === movieId);
                setIsMostLiked(Boolean(isMovieMostLiked));
                setIsInteractionsComplete(true);
            });

            return () => {
                setIsMostLiked(false);
                setIsInteractionsComplete(true);
            }
        }, [])
    )

    if (! isInteractionsComplete) return <ActivityIndicator color='#FFF' />

    return !isMostLiked 
        ? <Text></Text>
        : (
            <View style={ styles.badgeContainer }>
                <FeatherIcon 
                    name='thumbs-up'
                    size={ 13 }
                    color={ Colors.white }
                    style={ styles.icon }
                />
                <Text style={ styles.text }>Most Liked</Text>
            </View>
        )
}

const mapStateToProps = createStructuredSelector({
    MOVIE: movieSelector
});

const styles = StyleSheet.create({
    badgeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 105,
        height: 22,
        borderRadius: 10,
        backgroundColor: Colors.netFlixRed,
        marginTop: 5,
        color: Colors.white,
        paddingVertical: 10,
        margin: 'auto'
    },
    icon: {
        fontWeight: 'bold'
    },
    text: {
        marginLeft: 5,
        fontWeight: 'bold'
    },
});

export default connect(mapStateToProps)(MostLikedBadge)
