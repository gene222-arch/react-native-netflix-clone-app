import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import Text from './../../../components/Text';
import View from './../../../components/View';
import styles from './../../../assets/stylesheets/searchScreen';
import { getCachedFile } from './../../../utils/cacheImage';
import Image from './../../../components/Image';


const OnSearchList = ({ movies, handlePressDisplayShowInfo }) => 
{
    console.log('FILTERED MOVIES:', movies)
    return (
        <View style={{ flex: 1 }}>
            <Text h4 style={ styles.searchHeaderTitle }>TV Shows and Movies</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ movies }
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={ () => handlePressDisplayShowInfo(item) }>
                        <Image 
                            source={{ uri: getCachedFile('SearchList/Posters/', item.id, item.poster_path) }}
                            style={ styles.image }
                        />
                    </TouchableOpacity>
                )}
                numColumns={ 3 }
            />
        </View>
    )
}

export default OnSearchList
