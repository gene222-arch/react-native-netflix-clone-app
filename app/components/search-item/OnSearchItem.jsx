import React from 'react'
import Image from './../Image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './../../assets/stylesheets/onSearchItem';

const OnSearchItem = ({ uri, onPress }) => 
{
    return (
        <TouchableOpacity onPress={ onPress }>
            <Image 
                source={{ uri }}
                style={ styles.image }
            />
        </TouchableOpacity>
    )
}

export default OnSearchItem
