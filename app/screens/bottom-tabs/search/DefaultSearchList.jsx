import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import Text from './../../../components/Text';
import View from './../../../components/View';
import styles from './../../../assets/stylesheets/searchScreen';
import SearchItem from './../../../components/search-item/SearchItem';
import { getCachedFile } from './../../../utils/cacheImage';

const DefaultSearchList = ({ movies = [], handlePressDisplayShowInfo }) => 
{
    return (
        <View style={{ flex: 1 }}>
            <Text h4 style={ styles.searchHeaderTitle }>Top Researches</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ movies }
                renderItem={ ({ item }) => (
                    <SearchItem
                        uri={ item?.wallpaper_path } 
                        title={ item.title }
                        onPress={ () => handlePressDisplayShowInfo(item) }
                    />
                )}
            />
        </View>
    )
}

export default DefaultSearchList
