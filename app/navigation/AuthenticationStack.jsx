import React from 'react'
import { createStackNavigator, TransitionPresets     } from '@react-navigation/stack'
import LoginScreen from '../screens/auth/LoginScreen';
import GetStartedScreen from './../screens/auth/GetStartedScreen';
import AppLogo from './../components/AppLogo';


const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, 
};

const Stack = createStackNavigator();

const defaultOptions = {
    headerShown: false
};

const AuthenticationStack = () => 
{
    return (
        <Stack.Navigator  initialRouteName='GetStartedScreen' screenOptions={ TransitionScreenOptions }>
            <Stack.Screen name='GetStartedScreen' component={ GetStartedScreen } options={ defaultOptions }/>
            <Stack.Screen 
                name='Login' 
                component={ LoginScreen } options={ defaultOptions }
                options={{
                    headerTitle: props => <AppLogo />
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthenticationStack