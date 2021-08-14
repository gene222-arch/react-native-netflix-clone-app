import React, { useState, useEffect } from 'react'
import { FlatList, InteractionManager } from 'react-native'
import View from './../../../components/View';
import styles from './../../../assets/stylesheets/trailerInfo';
import ListHeader from './trailer-info-components/ListHeader';
import TrailerInfoScreenLoader from './../../../components/loading-skeletons/TrailerInfoScreenLoader';
import { createStructuredSelector } from 'reselect';
import { comingSoonMoviesSelector } from './../../../redux/modules/coming-soon/selectors';
import { connect } from 'react-redux';

const TrailerInfo = ({ COMING_SOON_MOVIE, route }) => 
{
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


    if (! isInteractionsComplete) {
        return <TrailerInfoScreenLoader />
    }

    return (
        <View style={ styles.container }>
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
