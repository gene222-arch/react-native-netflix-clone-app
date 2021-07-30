import React from 'react'
import View from './../View';
import Text from './../Text';
import Image from './../Image';
import { TouchableOpacity } from 'react-native';
import styles from './../../assets/stylesheets/selectProfile';

const SelectProfileItem = ({ item, handlePressSelectProfile }) => {
    return (
        <View style={ styles.profile }>
            <TouchableOpacity onPress={ handlePressSelectProfile }>
                <Image 
                    source={{
                        uri: item.avatar
                    }}
                    style={ styles.profileImg }
                />
                <Text h5 style={ styles.profileName }>{ item.name }</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectProfileItem
