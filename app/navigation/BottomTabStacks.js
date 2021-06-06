import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './../screens/bottom-tabs/home/HomeScreen';
import TabTwoScreen from './../screens/bottom-tabs/home/TabTwoScreen';
import DownloadsScreen from './../screens/bottom-tabs/downloads/DownloadsScreen';
import DownloadTabTwoScreen from './../screens/bottom-tabs/downloads/DownloadTabTwoScreen';
import SearchScreen from './../screens/bottom-tabs/search/SearchScreen';
import SearchTabTwoScreen from './../screens/bottom-tabs/search/SearchTabTwoScreen';
import ComingSoonScreen from './../screens/bottom-tabs/coming-soon/ComingSoonScreen';
import TabTwoScreenCS from './../screens/bottom-tabs/coming-soon/TabTwoScreenCS';
import AccountScreen from './../screens/bottom-tabs/account/AccountScreen';
import AccountTabTwoScreen from './../screens/bottom-tabs/account/AccountTabTwoScreen';

const HomeStack = createStackNavigator();

export const HomeTab = () => 
{
    return (
        <HomeStack.Navigator initialRouteName='Home'>
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
        <DownloadsStack.Navigator initialRouteName='Home'>
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
        <SearchStack.Navigator initialRouteName='Search'>
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
        <ComingSoonStack.Navigator initialRouteName='ComingSoon'>
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
        <AccountSoonStack.Navigator initialRouteName='Account'>
            <AccountSoonStack.Screen name='Account' component={ AccountScreen } />
            <AccountSoonStack.Screen 
                name='AccountTabTwo' 
                component={ AccountTabTwoScreen } 
                options={{ headerTitle: 'Account Tab Two' }} 
            />
        </AccountSoonStack.Navigator>
    );
}