import React from 'react'
import View from './../View';
import Text from './../Text';
import styles from './../../assets/stylesheets/profilePhotoItem';
import Image from './../Image';
import Colors from './../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfilePhotoItem = ({ profile, isSelected = false, onPress }) => 
{
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ styles.container }>
                <Image 
                    source={{ uri: profile?.avatar }}
                    style={ [isSelected ? styles.selectedImg : styles.defaultImg, styles.img] }
                />
                <Text style={{ 
                    color: isSelected ? Colors.white : Colors.grey, 
                    textAlign: 'center', 
                    fontSize: isSelected ? 14 : 13,
                    marginTop: 5
                }}>
                    { `${ profile?.name.slice(0, 6) }...` }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProfilePhotoItem