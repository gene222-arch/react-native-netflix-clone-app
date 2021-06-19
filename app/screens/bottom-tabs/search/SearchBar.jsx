import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from './../../../constants/Colors';

const SearchBar = ({ searchInput, handleChangeSearchInput, handleOnCancel, showLoading = false }) => 
{
    const inputRef = useRef('mic');

    const onChangeText = (text) => {
        handleChangeSearchInput(text);
        
        inputRef.current = !text.length ? 'mic' : 'x';
    }

    return (
        <Input
            placeholder='Search for a show, movie, genre etc..'
            value={ searchInput }
            onChangeText={ onChangeText }
            placeholderTextColor={ Colors.grey }
            inputStyle={ styles.input }
            inputContainerStyle={
                styles.inputContainer
            }
            containerStyle={
                styles.container
            }
            leftIcon={
                <FeatherIcon 
                    name='search'
                    color='#dddddd'
                    size={ 24 }
                    style={ styles.searchIcon }
                />
            }
            rightIcon={ 
                !showLoading 
                    ? <TouchableOpacity>
                        <FeatherIcon 
                            name={ inputRef.current }
                            color='#fff'
                            size={ 24 }
                            onPress={ () => inputRef.current === 'mic' ? console.log('Listening to voice') : handleOnCancel() }
                        />
                    </TouchableOpacity>
                    : <ActivityIndicator color='#fff' />
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
        padding: 5,
        marginVertical: 5,
        paddingHorizontal: 15
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
