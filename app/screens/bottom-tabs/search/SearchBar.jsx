import React, { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from './../../../constants/Colors';

const SearchBar = ({ searchInput, handleChangeSearchInput, handleOnCancel }) => 
{
    const inputRef = useRef('mic');
    const [ loading, setLoading ] = useState(false);

    const onChangeText = (text) => 
    {
        setLoading(true);
        handleChangeSearchInput(text);

        inputRef.current = !text.length ? 'mic' : 'x';
        setTimeout(() => setLoading(false), 10);
    }

    const onCancel = () => {
        handleOnCancel();
        inputRef.current = 'mic';
    }

    return (
        <Input
            placeholder='Search for a movie, genre, author etc..'
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
                !loading 
                    ? <TouchableOpacity>
                        <FeatherIcon 
                            name={ inputRef.current }
                            color='#fff'
                            size={ 24 }
                            onPress={ () => inputRef.current === 'mic' ? console.log('Listening to voice') : onCancel() }
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
