import React from 'react'
import View from './../View';
import Text from './../Text';
import styles from './../../assets/stylesheets/profilePhotoItem';
import Image from './../Image';
import Colors from './../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfilePhotoItem = ({ profile, isSelected = false, isAccessible, onPress }) => 
{
    return (
        <TouchableOpacity onPress={ onPress } disabled={ !profile.enabled && !isAccessible }>
            <View style={{ 
                marginHorizontal: 10,
                opacity: profile.enabled && isAccessible ? 1 : 0.3
            }}>
                <Image 
                    source={{ uri: profile?.avatar }}
                    style={ [isSelected ? styles.selectedImg : styles.defaultImg, styles.img] }
                />
                <Text 
                    style={{ 
                        color: isSelected ? Colors.white : Colors.grey, 
                        textAlign: 'center', 
                        fontSize: isSelected ? 14 : 13,
                        marginTop: 5,
                    }}
                >
                    { `${ profile?.name.slice(0, 6) }...`.toUpperCase() }
                </Text>
                {
                    Boolean(profile.is_for_kids) && (
                        <MaterialIcons 
                            name='child-care'
                            size={ 14 }
                            color={ Colors.grey }
                            style={ styles.forKidsIcon }
                        />
                    )
                }
                {
                    Boolean(profile.is_profile_locked) && (
                        <FeatherIcon 
                            name='lock'
                            size={ 16 }
                            color={ Colors.grey }
                            style={ styles.lockIcon }
                        />
                    )
                }
                {
                    Boolean(!profile.enabled) && (
                        <FeatherIcon 
                            name='slash'
                            size={ 16 }
                            color={ Colors.error }
                            style={ styles.lockIcon }
                        />
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

export default ProfilePhotoItem