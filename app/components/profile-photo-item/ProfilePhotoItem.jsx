import React from 'react'
import View from './../View';
import Text from './../Text';
import styles from './../../assets/stylesheets/profilePhotoItem';
import Image from './../Image';
import Colors from './../../constants/Colors';

const ProfilePhotoItem = ({ name, uri, isSelected = false }) => 
{
    return (
        <View style={ styles.container }>
            <Image 
                source={{ uri }}
                style={ [isSelected ? styles.selectedImg : styles.defaultImg, styles.img] }
            />
            <Text style={{ 
                color: isSelected ? Colors.white : Colors.grey, 
                textAlign: 'center', 
                fontSize: isSelected ? 14 : 13,
                marginTop: 5
            }}>
                { name }
            </Text>
        </View>
    )
}

export default ProfilePhotoItem