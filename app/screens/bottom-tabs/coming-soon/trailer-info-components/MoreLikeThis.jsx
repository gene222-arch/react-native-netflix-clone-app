import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, InteractionManager } from 'react-native';
import Text from './../../../../components/Text';
import View from './../../../../components/View';
import Image from './../../../../components/Image';
import styles from './../../../../assets/stylesheets/trailerInfo';
import { levenshteinFuzzyMatched } from './../../../../utils/algorithm';
import LoadingScreen from './../../../../components/LoadingScreen';

const MoreLikeThis = ({ currentComingSoonShow, comingSoonShows, handlePressSimilarShow }) => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ similarComingSoonShows, setSimilarComingSoonShows ] = useState([]);

    const filterViaLevenshteinAlgo = useCallback(e => {

        /** Remove the current show */
        let similarShows = [];
        let filteredShows = comingSoonShows.filter(({ id }) => id !== currentComingSoonShow.id);

        /** Get the genre to filter */
        const primaryGenre = currentComingSoonShow.genres[0];

        /** Filter the genres of each show via Levenshtein algorithm */
        filteredShows.forEach(show => {
            show.genres.map(genre => {
                /** Check the similarities of the string */
                if (levenshteinFuzzyMatched(primaryGenre, genre, .7)) {
                    similarShows.push(show);
                }
            });
        });

        setSimilarComingSoonShows(similarShows);
    }, []);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            filterViaLevenshteinAlgo();
            setIsInteractionsComplete(true);
        });
    }, []);

    if (!isInteractionsComplete) {
        return <LoadingScreen />
    }

    return (
        <View style={ styles.moreLikeThisContainer }>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ similarComingSoonShows }
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={ () => handlePressSimilarShow(item) }>
                        <Image 
                            source={{ uri: item.poster }}
                            style={ styles.moreLikeThisImg }
                        />
                    </TouchableOpacity>
                )}
                numColumns={ 3 }
                ListEmptyComponent={
                    <View style={ styles.moreLikeThisEmptyMessageContainer }>
                        <Text 
                            h4 
                            style={ styles.moreLikeThisEmptyMessage }
                        >
                            Oh darn. We don't have similar shows to '{ currentComingSoonShow.title }'.
                        </Text>
                        <Text style={ styles.similarMoviesNotFoundCaption }>Try searching for another coming soon movie or show.</Text>
                    </View>
                }
            />
        </View>
    )
}

export default MoreLikeThis
