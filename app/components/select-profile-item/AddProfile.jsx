import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './../../assets/stylesheets/selectProfile';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Text from './../Text';
import View from './../View';
import Colors from './../../constants/Colors';
import { useNavigation } from '@react-navigation/native';


const AddProfile = () => 
{
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={ () => navigation.navigate('CreateProfile') }>
            <View styles={ styles.createProfileContainer }>
                <FontAwesome5Icon 
                    name='plus-circle'
                    size={ 60 }
                    color={ Colors.white }
                    style={ styles.createProfileIcon }
                />
                <Text h5 style={ styles.createProfileText }>Add Profile</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AddProfile
