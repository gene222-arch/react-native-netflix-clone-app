import React from 'react'
import { FlatList } from 'react-native';
import StyledSkeletonContent from '../styled-components/StyledSkeletonContent';

const skeletonList = () => 
{
    let count = 12;
    let loaders = [];

    while(count !== 0) {
        loaders.push(
            <StyledSkeletonContent 
                containerStyle={{ flex: 1 }}
                layout={[
                    { 
                        key: 'key', 
                        width: 125,
                        height: 170,
                        margin: 5
                    },
                ]}
            />
            )

        count--;
    }

    return loaders;
}


const MyListScreenLoader = () => 
{
    return (
        <FlatList 
            keyExtractor={ (item, index) => index.toString() }
            data={ skeletonList() }
            numColumns={ 3 }
            renderItem={ ({ item }) => item }
        />
    )
}

export default MyListScreenLoader
