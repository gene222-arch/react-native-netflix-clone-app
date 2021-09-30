import React from 'react'
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import LoginScreen from '../screens/auth/LoginScreen';
import UnlimitedMoviesScreen from './../screens/get-started/UnlimitedMoviesScreen';
import GetStartedScreen from './../screens/get-started/GetStartedScreen';
import WatchEverywhereScreen from './../screens/get-started/WatchEverywhereScreen';

const Stack = createStackNavigator();

const AuthenticationStack = () => 
{
    return (
        <Stack.Navigator 
            initialRouteName='UnlimitedMoviesScreen' 
            screenOptions={{ 
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            <Stack.Screen 
                name='UnlimitedMoviesScreen' 
                component={ UnlimitedMoviesScreen }
                options={{
                    headerTitle: 'Unlimited Movies'
                }}
            />

            <Stack.Screen 
                name='WatchEverywhereScreen' 
                component={ WatchEverywhereScreen }
                options={{
                    headerTitle: 'Watch everywhere'
                }}
            />

            <Stack.Screen 
                name='GetStartedScreen' 
                component={ GetStartedScreen }
                options={{
                    headerTitle: 'Get Started'
                }}
            />

            <Stack.Screen name='Login' component={ LoginScreen } options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

export default AuthenticationStack