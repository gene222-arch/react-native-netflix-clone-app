import React from 'react'
import Image from '../Image';
import styles from './../../assets/stylesheets/myListItem';

const MyListItem = ({ uri }) => {
    return (
        <Image 
            source={{ uri }}
            style={ styles.image }
        />
    )
}

export default MyListItem
