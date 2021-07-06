import React from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import styles from '../../../assets/stylesheets/profileAppBar';
import { TouchableOpacity } from 'react-native';
import StackNavBackButton from '../../../components/stack-app-bar/StackNavBackButton';

const ProfileAppBar = ({ onPress, headerTitle = '', ...props }) => 
{
    return (
        <View style={ styles.container }>
            <View style={ styles.backButtonContainer }>
                <StackNavBackButton />
                <Text style={ styles.headerTitle }>{ headerTitle }</Text>
            </View>
            <TouchableOpacity onPress={ onPress }>
                <Text style={ styles.saveText }>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileAppBar
