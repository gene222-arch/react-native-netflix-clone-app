import React from 'react'
import { Image } from "react-native-expo-image-cache";
import { useNavigation } from '@react-navigation/native'
import { FlatList, Pressable } from 'react-native'
import styles from '../../assets/stylesheets/homeCategory';
import Text from '../Text';
import View from './../View';


const HomeCategory = ({ title, categorizedMovies }) => 
{
    const navigation = useNavigation();

    const handlePressImage = (movie) => {
        navigation.navigate('MovieDetailScreen', { 
            id: movie.id, 
            headerTitle: movie.title 
        });
    }

    return categorizedMovies.length > 0 && (
        <View>
            <Text h4 style={ styles.categoryTitle }>{ title }</Text>
            <FlatList 
                keyExtractor={(item, index) => index.toString() }
                data={ categorizedMovies }
                renderItem={({ item }) => (
                    <Pressable onPress={ () => handlePressImage(item) }>
                        <Image 
                            preview={{ uri: item.poster_path }}
                            style={ styles.image }
                            uri={ item.poster_path }
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
