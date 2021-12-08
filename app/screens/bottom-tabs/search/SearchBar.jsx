import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from './../../../constants/Colors';

const SearchBar = ({ searchInput, handleChangeSearchInput, handleOnCancel }) => 
{
    const [ isLoading, setIsLoading ] = useState(false);

    const onChangeText = (text) => 
    {
        setIsLoading(true);
        handleChangeSearchInput(text);
        setIsLoading(false);
    }

    useEffect(() => {
        return () => {
            setIsLoading(false);
        }
    }, []);

    return (
        <Input
            placeholder='Search for a movie, genre, author, etc..'
            value={ searchInput }
            onChangeText={ onChangeText }
            placeholderTextColor={ Colors.grey }
            inputStyle={ styles.input }
            inputContainerStyle={ styles.inputContainer }
            containerStyle={ styles.container }
            leftIcon={
                <FeatherIcon 
                    name='search'
                    color='#dddddd'
                    size={ 24 }
                    style={ styles.searchIcon }
                />
            }
            rightIcon={ 
                isLoading 
                    ? <ActivityIndicator color='#fff' /> 
                    : Boolean(searchInput.length) && (
                        <TouchableOpacity onPress={ handleOnCancel }>
                            <FeatherIcon 
                                name='x'
                                color='#dddddd'
                                size={ 24 }
                                style={ styles.searchIcon }
                            />
                        </TouchableOpacity>
                    )
            }
        />
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
    },
    inputContainer: {
        borderBottomWidth: 0,
        backgroundColor: Colors.darkGrey,
        paddingHorizontal: 15,
    },
    input: {
        fontSize: 16,
        color: Colors.white
    },
    label: {
        fontSize: 12
    },
    searchIcon: {
        paddingRight: 5,
        fontWeight: 'bold'
    },
    micIcon:{
        fontWeight: 'bold'
    },
});
