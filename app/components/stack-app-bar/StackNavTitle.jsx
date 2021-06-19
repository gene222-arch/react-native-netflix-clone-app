import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather';


const StackNavTitle = () => 
{
    const navigation = useNavigation();

    const navigatoToSearchScreen = () => navigation.navigate('Search');
    
    return (
        <TouchableOpacity onPress={ navigatoToSearchScreen }>
            <FeatherIcon 
                name='search'
                size={ 34 }
                color='#fff'
                style={ styles.searchIcon }
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    searchIcon: {
        textAlign: 'right',
        marginRight: 1
    }
})

export default StackNavTitle
