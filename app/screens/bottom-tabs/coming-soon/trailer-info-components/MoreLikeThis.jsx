import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, InteractionManager } from 'react-native';
import Text from './../../../../components/Text';
import View from './../../../../components/View';
import styles from './../../../../assets/stylesheets/trailerInfo';
import { levenshteinFuzzyMatched } from './../../../../utils/algorithm';
import LoadingScreen from './../../../../components/LoadingScreen';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Image } from 'react-native-expo-image-cache';
import { useNavigation } from '@react-navigation/native';
import { movieSelector } from './../../../../redux/modules/movie/selectors';

const MoreLikeThis = ({ MOVIE, comingSoonMovie }) => 
{
    const navigation = useNavigation();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ similarMovies, setSimilarMovies ] = useState([]);

    const handlePressSimilarShow = (item) => 
    {
        navigation.navigate('Home', {
            screen: 'MovieDetailScreen',
            params: {
                headerTitle: item.title,
                id: item.id 
            }
        });
    }

    const filterViaLevenshteinAlgo = useCallback(e => 
    {
        /** Remove the current show */
        let similarMovies = [];

        /** Get the genre to filter */
        const genres = comingSoonMovie.genres.split(',');
        const primaryGenre = genres[0];

        /** Filter the genres of each show via Levenshtein algorithm */
        MOVIE.movies.forEach(show => {
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

        setSimilarMovies(similarMovies);
    }, []);

    useEffect(() => 
    {
        if (isInteractionsComplete) {
            filterViaLevenshteinAlgo();
        }

        InteractionManager.runAfterInteractions(() => {
            filterViaLevenshteinAlgo();
            setIsInteractionsComplete(true);
        });

        return () => {
            setIsInteractionsComplete(false);
            setSimilarMovies([]);
        }
    }, []);

    
    if (! isInteractionsComplete) return <LoadingScreen />

    return (
        <View style={ styles.moreLikeThisContainer }>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ similarMovies }
                numColumns={ 3 }
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={ () => handlePressSimilarShow(item) }>
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
    MOVIE: movieSelector
});

export default connect(mapStateToProps)(MoreLikeThis)
