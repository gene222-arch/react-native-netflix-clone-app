import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable, FlatList } from 'react-native'
import styles from '../../assets/stylesheets/homeCategory';
import Text from '../Text';
import Image from './../Image';
import { getCachedFile } from './../../utils/cacheImage';
import View from './../View';


const HomeCategory = ({ title, categorizedMovies }) => 
{
    const navigation = useNavigation();

    const handlePressMovieImage = (movie) => {
        navigation.navigate('MovieDetailScreen', { 
            id: movie.id, 
            headerTitle: movie.title 
        });
    }

    return (
        <View>
            <Text h4 style={ styles.categoryTitle }>{ title }</Text>
            <FlatList 
                keyExtractor={({ id }) => id.toString() }
                data={ categorizedMovies }
                renderItem={({ item }) => (
                    <Pressable onPress={ () => handlePressMovieImage(item) }>
                        <Image 
                            style={ styles.image }
                            source={{ uri: getCachedFile('Categories/', item.id, item.poster_path) }}
                        />
                    </Pressable>
                )}
                maxToRenderPerBatch={ 3 }
                horizontal
                style={ styles.categoryContainer }
                showsHorizontalScrollIndicator={ false }
                showsVerticalScrollIndicator={ false }
            />
        </View>
    )
}

export default HomeCategory
