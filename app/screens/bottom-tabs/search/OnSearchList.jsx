import React from 'react'
import { FlatList } from 'react-native'
import Text from './../../../components/Text';
import View from './../../../components/View';
import styles from './../../../assets/stylesheets/searchScreen';
import { getCachedFile } from './../../../utils/cacheImage';
import OnSearchItem from './../../../components/search-item/OnSearchItem';


const OnSearchList = ({ searchList = [], handlePressDisplayShowInfo }) => {
    return (
        <View style={{ flex: 1 }}>
            <Text h4 style={ styles.searchHeaderTitle }>TV Shows and Movies</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ searchList }
                renderItem={ ({ item }) => (
                    <OnSearchItem
                        uri={ getCachedFile('SearchList/Posters/', item.id, item.poster) }
                        onPress={ () => handlePressDisplayShowInfo(item) }
                    />
                )}
                numColumns={ 3 }
            />
        </View>
    )
}

export default OnSearchList
