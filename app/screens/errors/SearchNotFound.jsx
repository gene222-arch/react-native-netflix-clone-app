import React from 'react'
import View from './../../components/View';
import Text from './../../components/Text';

const SearchNotFound = ({ styles }) => 
{
    return (
        <View style={ styles.emptyList }>
            <Text h4>Oh darn. We don't have that.</Text>
            <Text style={ styles.notFoundCaption }>Try searching for another movie, show, actor, director, or genre.</Text>
        </View>
    )
}

export default SearchNotFound
