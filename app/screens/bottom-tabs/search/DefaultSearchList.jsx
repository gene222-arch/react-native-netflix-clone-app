import React from 'react'
import { FlatList } from 'react-native'
import Text from './../../../components/Text';
import View from './../../../components/View';
import styles from './../../../assets/stylesheets/searchScreen';
import SearchItem from './../../../components/search-item/SearchItem';

const DefaultSearchList = ({ movies = [], handlePressDisplayShowInfo }) => 
{
    return (
        <View style={{ flex: 1 }}>
            <Text h4 style={ styles.searchHeaderTitle }>Top Searches</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ movies }
                renderItem={ ({ item }) => (
                    <SearchItem
                        uri={ item.wallpaper_path } 
                        title={ item.title }
                        onPress={ () => handlePressDisplayShowInfo(item) }
                    />
                )}
                showsHorizontalScrollIndicator={ false }
                showsVerticalScrollIndicator={ false }
            />
        </View>
    )
}

export default DefaultSearchList
