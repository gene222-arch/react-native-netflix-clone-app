import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/auth/LoginScreen';
import GetStartedScreen from './../screens/auth/GetStartedScreen';

const Stack = createStackNavigator();

const defaultOptions = {
    headerShown: false
};

const AuthenticationStack = () => 
{
    return (
        <Stack.Navigator  initialRouteName='GetStartedScreen'>
            <Stack.Screen name='GetStartedScreen' component={ GetStartedScreen } options={ defaultOptions }/>
            <Stack.Screen name='Login' component={ LoginScreen } options={ defaultOptions }/>
        </Stack.Navigator>
    );
}

export default AuthenticationStack