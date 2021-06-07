import React from 'react'
import { ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../assets/stylesheets/homeCategory';
import Text from '../Text';
import Image from './../Image';

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
                        PlaceholderContent={<ActivityIndicator />}
                    />
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
