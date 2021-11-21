import React from 'react'
import View from './../View';
import Text from './../Text';
import Image from './../Image';
import { TouchableOpacity } from 'react-native';
import styles from './../../assets/stylesheets/selectProfile';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from './../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SelectProfileItem = ({ item, handlePressSelectProfile, imageStyle, isClickable }) => 
{
    return (
        <View style={{ ...styles.profile, opacity: !isClickable || !item.enabled ? 0.3 : 1 }}>
            <TouchableOpacity onPress={ handlePressSelectProfile } disabled={ !isClickable || !item.enabled}>
                <Image 
                    source={{
                        uri: item.avatar
                    }}
                    style={[ styles.profileImg, imageStyle ]}
                />
                <Text h5 style={ styles.profileName }>{ item.name.toUpperCase() }</Text>
                {
                    Boolean(item.is_for_kids) && (
                        <MaterialIcons 
                            name='child-care'
                            size={ 14 }
                            color={ Colors.grey }
                            style={ styles.forKidsIcon }
                        />
                    )
                }
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
                {
                    Boolean(!item.enabled) && (
                        <FeatherIcon 
                            name='slash'
                            size={ 16 }
                            color={ Colors.error }
                            style={ styles.lockIcon }
                        />
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default SelectProfileItem
