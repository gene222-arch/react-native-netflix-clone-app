import React from 'react'
import { FlatList } from 'react-native'
import View from './../../../components/View';
import styles from './../../../assets/stylesheets/trailerInfo';
import ListHeader from './trailer-info-components/ListHeader';

const TrailerInfo = ({ route }) => 
{
    const { comingSoonMovie } = route.params;

    return (
        <View style={ styles.container }>
            <FlatList 
                data={[]}
                ListHeaderComponent={ <ListHeader comingSoonMovie={ comingSoonMovie }  /> }
            />
        </View>
    )
}

export default TrailerInfo
