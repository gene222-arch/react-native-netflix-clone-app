import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Pressable } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../assets/stylesheets/homeCategory';
import Text from '../Text';
import Image from './../Image';
import * as FileSystem from 'expo-file-system'
import { getCachedFile } from './../../utils/cacheImage';


const HomeCategory = ({ title, categories }) => 
{
    const navigation = useNavigation();

    const handlePressMovieImage = ({ id }) => navigation.navigate('MovieDetailScreen', { id });

    return (
        <>
            <Text h4>{ title }</Text>
            <FlatList 
                keyExtractor={({ id }) => id}
                data={ categories }
                renderItem={({ item }) => (
                    <Pressable onPress={ () => handlePressMovieImage(item) }>
                        <Image 
                            style={ styles.image }
                            source={{ uri: getCachedFile('FrontPages/', item.i, item.poster) }}
                        />
                    </Pressable>
                )}
                maxToRenderPerBatch={ 3 }
                horizontal
                style={ styles.categoryContainer }
                showsHorizontalScrollIndicator={ false }
            />
        </>
    )
}

export default HomeCategory
