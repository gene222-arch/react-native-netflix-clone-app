import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, InteractionManager } from 'react-native';
import Text from './../../../../components/Text';
import View from './../../../../components/View';
import styles from './../../../../assets/stylesheets/trailerInfo';
import { levenshteinFuzzyMatched } from './../../../../utils/algorithm';
import LoadingScreen from './../../../../components/LoadingScreen';
import { createStructuredSelector } from 'reselect';
import { comingSoonMoviesSelector } from './../../../../redux/modules/coming-soon/selectors';
import { connect } from 'react-redux';
import { Image } from 'react-native-expo-image-cache';
import { useNavigation } from '@react-navigation/native';

const MoreLikeThis = ({ COMING_SOON_MOVIE, comingSoonMovie }) => 
{
    const navigation = useNavigation();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ similarComingSoonMovies, setSimilarComingSoonMovies ] = useState([]);

    const handlePressSimilarShow = (id) => navigation.push('TrailerInfo', { id });

    const filterViaLevenshteinAlgo = useCallback(e => {

        /** Remove the current show */
        let similarMovies = [];
        let filteredMovies = COMING_SOON_MOVIE.comingSoonMovies.filter(({ id }) => id !== comingSoonMovie.id);

        /** Get the genre to filter */
        const genres = comingSoonMovie.genres.split(',');
        const primaryGenre = genres[0];

        /** Filter the genres of each show via Levenshtein algorithm */
        filteredMovies.forEach(show => {
            show
                .genres
                .split(',')
                .map(genre => {
                    /** Check the similarities of the string */
                    if (levenshteinFuzzyMatched(primaryGenre, genre, .7)) {
                        similarMovies.push(show);
                    }
                });
        });

        setSimilarComingSoonMovies(similarMovies);
    }, []);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            filterViaLevenshteinAlgo();
            setIsInteractionsComplete(true);
        });

        return () => {
            setIsInteractionsComplete(false);
            setSimilarComingSoonMovies([]);
        }
    }, []);

    if (!isInteractionsComplete) {
        return <LoadingScreen />
    }

    return (
        <View style={ styles.moreLikeThisContainer }>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ similarComingSoonMovies }
                numColumns={ 3 }
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={ () => handlePressSimilarShow(item.id) }>
                        <Image 
                            preview={{ uri: item.poster_path }}
                            uri={ item.poster_path }
                            style={ styles.moreLikeThisImg }
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={ styles.moreLikeThisEmptyMessageContainer }>
                        <Text h4>
                            Oh darn. We don't have similar shows to { comingSoonMovie.title }.
                        </Text>
                        <Text style={ styles.similarMoviesNotFoundCaption }>Try searching for another coming soon movie or show.</Text>
                    </View>
                }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: comingSoonMoviesSelector
});

export default connect(mapStateToProps)(MoreLikeThis)
