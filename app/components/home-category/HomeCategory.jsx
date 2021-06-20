import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Pressable } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
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
            <Text h4>{ title }</Text>
            <FlatList 
                keyExtractor={({ id }) => id}
                data={ categories }
                renderItem={({ item }) => (
                    <Pressable onPress={ () => handlePressMovieImage(item) }>
                        <Image 
                            style={ styles.image }
                            source={{ uri: getCachedFile('Categories/', item.id, item.poster) }}
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
