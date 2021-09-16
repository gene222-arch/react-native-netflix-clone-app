import React from 'react'
import View from './../View';
import Text from './../Text';
import Image from './../Image';
import { TouchableOpacity } from 'react-native';
import styles from './../../assets/stylesheets/selectProfile';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from './../../constants/Colors';

const SelectProfileItem = ({ item, handlePressSelectProfile, imageStyle }) => {
    return (
        <View style={ styles.profile }>
            <TouchableOpacity onPress={ handlePressSelectProfile }>
                <Image 
                    source={{
                        uri: item.avatar
                    }}
                    style={[ styles.profileImg, imageStyle ]}
                />
                <Text h5 style={ styles.profileName }>{ item.name }</Text>
                {
                    Boolean(item.is_profile_locked) && (
                        <FeatherIcon 
                            name='lock'
                            size={ 16 }
                            color={ Colors.grey }
                            style={ styles.lockIcon }
                        />
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default SelectProfileItem
