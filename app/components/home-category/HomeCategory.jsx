import React from 'react'
import { Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../assets/stylesheets/homeCategory';
import Text from '../Text';

const HomeCategory = ({ title, categories }) => 
{
    return (
        <>
            <Text h4>{ title }</Text>
            <FlatList 
                keyExtractor={({ id }) => id}
                data={ categories }
                renderItem={({ item }) => (
                    <Image 
                        style={ styles.image }
                        source={{
                            uri: item.poster
                        }}
                    />
                )}
                maxToRenderPerBatch={ 3 }
                horizontal
                style={ styles.categoryContainer }
            />
        </>
    )
}

export default HomeCategory
