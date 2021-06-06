import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './../screens/bottom-tabs/home';
import TabTwoScreen from './../screens/bottom-tabs/home/TabTwoScreen';
import DownloadsScreen from './../screens/bottom-tabs/downloads';
import DownloadTabTwoScreen from './../screens/bottom-tabs/downloads/DownloadTabTwoScreen';
import SearchScreen from './../screens/bottom-tabs/search';
import SearchTabTwoScreen from './../screens/bottom-tabs/search/SearchTabTwoScreen';
import ComingSoonScreen from './../screens/bottom-tabs/coming-soon';
import TabTwoScreenCS from './../screens/bottom-tabs/coming-soon/TabTwoScreenCS';
import AccountScreen from './../screens/bottom-tabs/account';
import AccountTabTwoScreen from './../screens/bottom-tabs/account/AccountTabTwoScreen';


const screenOptions = {
    headerShown: false
};

const HomeStack = createStackNavigator();

export const HomeTab = () => 
{
    return (
        <HomeStack.Navigator initialRouteName='Home' screenOptions={ screenOptions }>
            <HomeStack.Screen name='Home' component={ HomeScreen } />
            <HomeStack.Screen 
                name='TabTwo' 
                component={ TabTwoScreen } 
                options={{ headerTitle: 'Home Tab Two' }}
            />
        </HomeStack.Navigator>
    );
}

const DownloadsStack = createStackNavigator();

export const DownloadsTab = () => 
{
    return (
        <DownloadsStack.Navigator initialRouteName='Home' screenOptions={ screenOptions }>
            <DownloadsStack.Screen name='Downloads' component={ DownloadsScreen } />
            <DownloadsStack.Screen 
                name='DownloadTabTwo' 
                component={ DownloadTabTwoScreen } 
                options={{ headerTitle: 'Downloads Tab Two' }}
            />
        </DownloadsStack.Navigator>
    );
}

const SearchStack = createStackNavigator();

export const SearchTab = () => 
{
    return (
        <SearchStack.Navigator initialRouteName='Search' screenOptions={ screenOptions }>
            <SearchStack.Screen name='Search' component={ SearchScreen } />
            <SearchStack.Screen 
                name='SearchTabTwo' 
                component={ SearchTabTwoScreen }
                options={{ headerTitle: 'Search Tab Two' }} 
            />
        </SearchStack.Navigator>
    );
}

const ComingSoonStack = createStackNavigator();

export const ComingSoonTab = () => 
{
    return (
        <ComingSoonStack.Navigator initialRouteName='ComingSoon' screenOptions={ screenOptions }>
            <ComingSoonStack.Screen name='ComingSoon' component={ ComingSoonScreen } />
            <ComingSoonStack.Screen 
                name='ComingSoonTabTwo' 
                component={ TabTwoScreenCS } 
                options={{ headerTitle: 'Coming Soon Tab Two' }} 
            />
        </ComingSoonStack.Navigator>
    );
}

const AccountSoonStack = createStackNavigator();

export const AccountTab = () => 
{
    return (
        <AccountSoonStack.Navigator initialRouteName='Account' screenOptions={ screenOptions }>
            <AccountSoonStack.Screen name='Account' component={ AccountScreen } />
            <AccountSoonStack.Screen 
                name='AccountTabTwo' 
                component={ AccountTabTwoScreen } 
                options={{ headerTitle: 'Account Tab Two' }} 
            />
        </AccountSoonStack.Navigator>
    );
}