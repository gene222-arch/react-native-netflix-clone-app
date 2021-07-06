import React from 'react'
import View from './../View';
import Text from './../Text';
import Image from './../Image';
import { TouchableOpacity } from 'react-native';

const SelectProfileItem = ({ styles, item, handlePressSelectProfile }) => {
    return (
        <View style={ styles.profile }>
            <TouchableOpacity onPress={ () => handlePressSelectProfile(item) }>
                <Image 
                    source={{
                        uri: item.profile_photo
                    }}
                    style={ styles.profileImg }
                />
                <Text h5 style={ styles.profileName }>{ item.name }</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectProfileItem
