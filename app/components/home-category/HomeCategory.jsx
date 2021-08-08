import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable, FlatList } from 'react-native'
import styles from '../../assets/stylesheets/homeCategory';
import Text from '../Text';
import Image from './../Image';
import { getCachedFile } from './../../utils/cacheImage';


const HomeCategory = ({ title, categories }) => 
{
    const navigation = useNavigation();

    const handlePressMovieImage = (show) => navigation.navigate('MovieDetailScreen', { id: show.id, headerTitle: show.title });

    return categories.length > 0 && (
        <>
            <Text h4 style={ styles.categoryTitle }>{ title }</Text>
            <FlatList 
                keyExtractor={({ id }) => id}
                data={ categories }
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
        </>
    )
}

export default HomeCategory
