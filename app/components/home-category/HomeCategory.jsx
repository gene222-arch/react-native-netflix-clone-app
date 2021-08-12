import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'
import styles from '../../assets/stylesheets/homeCategory';
import Text from '../Text';
import View from './../View';
import MovieItem from './MovieItem';
import TextLoader from '../loading-skeletons/TextLoader';


const HomeCategory = ({ isLoading = false, title, categorizedMovies }) => 
{
    const navigation = useNavigation();

    const handlePressImage = (movie) => {
        navigation.navigate('MovieDetailScreen', { 
            id: movie.id, 
            headerTitle: movie.title 
        });
    }

    return (
        <View>
            {
                isLoading 
                    ? <TextLoader />
                    : <Text h4 style={ styles.categoryTitle }>{ title }</Text>
            }
            <FlatList 
                keyExtractor={({ id }) => id.toString() }
                data={ categorizedMovies }
                renderItem={({ item }) => <MovieItem movie={ item } handlePressImage={ () => handlePressImage(item) } />}
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
