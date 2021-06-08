import React, { useState } from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import { SearchBar, ListItem, Avatar } from 'react-native-elements';
import styles from './../../../assets/stylesheets/searchScreen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const list = [
    {
        id: 1,
        name: 'Amy Farha',
        subtitle: 'Vice President'
    },
    {
        id: 2,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },
    {
        id: 3,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },
    {
        id: 4,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },        
    {
        id: 5,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },
    {
        id: 6,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },   
    {
        id: 7,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },   
    {
        id: 8,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },   
    {
        id: 9,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },   
    {
        id: 10,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },   
    {
        id: 11,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },   
    {
        id: 12,
        name: 'Chris Jackson',
        
        subtitle: 'Vice Chairman'
    },   
];

const SearchScreen = () => 
{
    const [ searchList, setSearchList ] = useState(list);
    const [ searchInput, setSearchInput ] = useState('');

    const handleChangeSearchInput = text => {
        setSearchInput(text);
        setSearchList(list.filter(({ name }) => (name.toLowerCase()).includes(text)));
    }
    

    return (
        <View style={ styles.container }>
            <SearchBar
                placeholder="Title, Person, and Genres"
                onChangeText={ handleChangeSearchInput }
                value={ searchInput }
                inputStyle={ styles.searchInput }
                containerStyle={ styles.searchContainer }
                inputContainerStyle={ styles.searchInputContainer }
            />
            {
                (!searchList.length) 
                    ? (
                        <View style={ styles.emptyList }>
                            <Text>Title, Person, and Genres Not Found</Text>
                        </View>
                    )
                    : (
                        <FlatList 
                            data={ searchList }
                            renderItem={ ({ item }) => (
                                <TouchableOpacity>
                                    <Text style={ styles.listText }>{ item.name }</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )
            }
        </View>
    )
}

export default SearchScreen
