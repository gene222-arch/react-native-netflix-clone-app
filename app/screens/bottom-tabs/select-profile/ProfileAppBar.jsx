import React from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import styles from '../../../assets/stylesheets/profileAppBar';
import { TouchableOpacity } from 'react-native';
import StackNavBackButton from '../../../components/stack-app-bar/StackNavBackButton';

const ProfileAppBar = ({ isLoading = false, onPress, headerTitle = '', showSaveButton = true, ...props }) => 
{
    return (
        <View style={ styles.container }>
            <View style={ styles.backButtonContainer }>
                <StackNavBackButton isLoading={ isLoading } />
                <Text style={ styles.headerTitle }>{ headerTitle }</Text>
            </View>
            {
                showSaveButton && (
                    <TouchableOpacity onPress={ onPress } disabled={ isLoading } >
                        <Text style={ styles.saveText }>Save</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default ProfileAppBar
