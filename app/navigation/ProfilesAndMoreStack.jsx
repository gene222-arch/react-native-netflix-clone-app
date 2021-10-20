import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StackNavBackButton from '../components/stack-app-bar/StackNavBackButton';
import ProfilesAndMoreScreen from '../screens/bottom-tabs/more/ProfilesAndMoreScreen';
import AppSettingsScreen from './../screens/bottom-tabs/more/app-settings/index';
import DeviceInformationScreen from './../screens/bottom-tabs/more/app-settings/DeviceInformationScreen';

const Stack = createStackNavigator();

const options = ({ route }) => 
{
    const headerTitle = typeof route.params === 'object' ? route?.params.headerTitle : 'Profiles & More';

    return ({
        headerLeft: props => <StackNavBackButton { ...props } />,
        headerTitle
    });
}

const ProfilesAndMoreStack = () => 
{
    return (
        <Stack.Navigator initialRouteName='ProfilesAndMore'>
            <Stack.Screen 
                name='ProfilesAndMore' 
                component={ ProfilesAndMoreScreen } 
                options={ options }
            />
            <Stack.Screen 
                name='AppSettingsScreen' 
                component={ AppSettingsScreen } 
                options={ options }
            />
            <Stack.Screen 
                name='DeviceInformationScreen' 
                component={ DeviceInformationScreen } 
                options={ options }
            />
        </Stack.Navigator>
    );
}

export default ProfilesAndMoreStack
