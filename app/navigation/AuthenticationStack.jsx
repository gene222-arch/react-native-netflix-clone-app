import React, { lazy } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

const AuthenticationStack = () => 
{
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={ LoginScreen } options={{ headerShown: false }}/>
            <Stack.Screen name='Register' component={ RegisterScreen } />
        </Stack.Navigator>
    );
}

export default AuthenticationStack