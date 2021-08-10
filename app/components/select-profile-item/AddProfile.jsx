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
        <View styles={ styles.createProfileContainer }>
            <TouchableOpacity onPress={ () => navigation.navigate('CreateProfile') }>
                <FontAwesome5Icon 
                    name='plus-circle'
                    size={ 60 }
                    color={ Colors.white }
                />
            </TouchableOpacity>
            <Text h5 style={ styles.createProfileText }>Add Profile</Text>
        </View>
    )
}

export default AddProfile
