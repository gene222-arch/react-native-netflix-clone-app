import React from 'react'
import { Image } from "react-native-expo-image-cache";
import { useNavigation } from '@react-navigation/native'
import { FlatList, TouchableOpacity } from 'react-native'
import styles from '../../assets/stylesheets/homeCategory';
import Text from '../Text';
import View from './../View';
import MostLikedBadge from './../MostLikedBadge';

const DisplayMovieImage = ({ item, onPressImage }) => 
{
    return (
        <TouchableOpacity 
            onPress={ onPressImage } 
            style={ styles.imageContainer }
        >
            <Image 
                preview={{ uri: item.poster_path }}
                style={ styles.image }
                uri={ item.poster_path }
            />
            <MostLikedBadge movieId={ item.id } />
        </TouchableOpacity>
    )
}

const HomeCategory = ({ title, categorizedMovies }) => 
{
    const navigation = useNavigation();

    const handlePressImage = (movie) => {
        navigation.navigate('MovieDetailScreen', { 
            id: movie.id, 
            headerTitle: movie.title 
        });
    }

    return (
        Boolean(categorizedMovies.length) && (
            <View>
                <Text h4 style={ styles.categoryTitle }>{ title }</Text>
                <FlatList 
                    keyExtractor={(item, index) => index.toString() }
                    data={ categorizedMovies }
                    renderItem={({ item }) => <DisplayMovieImage item={ item } onPressImage={ () => handlePressImage(item) } /> }
                    maxToRenderPerBatch={ 3 }
                    horizontal
                    style={ styles.categoryContainer }
                    showsHorizontalScrollIndicator={ false }
                    showsVerticalScrollIndicator={ false }
                />
            </View>
        )
    )
}

export default HomeCategory
