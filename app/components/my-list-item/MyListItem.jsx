import React from 'react'
import { TouchableOpacity } from 'react-native'
import Image from '../Image';
import styles from './../../assets/stylesheets/myListItem';

const MyListItem = ({ uri, handlePressDisplayShowInfo }) => 
{
    return (
        <TouchableOpacity onPress={ handlePressDisplayShowInfo }>
            <Image 
                source={{ uri }}
                style={ styles.image }
            />
        </TouchableOpacity>
    )
}

export default MyListItem
