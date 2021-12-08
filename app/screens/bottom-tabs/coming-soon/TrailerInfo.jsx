import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, InteractionManager, BackHandler } from 'react-native'
import View from './../../../components/View';
import ListHeader from './trailer-info-components/ListHeader';
import TrailerInfoScreenLoader from './../../../components/loading-skeletons/TrailerInfoScreenLoader';
import { createStructuredSelector } from 'reselect';
import { comingSoonMoviesSelector } from './../../../redux/modules/coming-soon/selectors';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';

const TrailerInfo = ({ COMING_SOON_MOVIE, route }) => 
{
    const navigation = useNavigation();

    const { id } = route.params;
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ comingSoonMovie, setComingSoonMovie ] = useState(null);


    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const findById = COMING_SOON_MOVIE.comingSoonMovies.find(movie => movie.id === id);
            setComingSoonMovie(findById);
            setIsInteractionsComplete(true);
        });

        return () => {
            setIsInteractionsComplete(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            BackHandler.removeEventListener('hardwareBackPress', () => true);
            BackHandler.addEventListener('hardwareBackPress', () => {
                navigation.navigate('ComingSoon');
                return true;
            });
        }, [])
    )


    if (! isInteractionsComplete) return <TrailerInfoScreenLoader />

    return (
        <View>
            <FlatList 
                data={[]}
                ListHeaderComponent={ <ListHeader comingSoonMovie={ comingSoonMovie }  /> }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: comingSoonMoviesSelector
});

export default connect(mapStateToProps)(TrailerInfo)
