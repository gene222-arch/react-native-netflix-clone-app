import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/bottom-tabs/home';
import MovieDetailsScreen from './../screens/bottom-tabs/home/movie-details-screen/index';
import TabTwoScreen from '../screens/bottom-tabs/home/TabTwoScreen';
import DownloadsScreen from '../screens/bottom-tabs/downloads';
import DownloadTabTwoScreen from '../screens/bottom-tabs/downloads/DownloadTabTwoScreen';
import SearchScreen from '../screens/bottom-tabs/search';
import SearchTabTwoScreen from '../screens/bottom-tabs/search/SearchTabTwoScreen';
import ComingSoonScreen from '../screens/bottom-tabs/coming-soon';
import TabTwoScreenCS from '../screens/bottom-tabs/coming-soon/TabTwoScreenCS';
import AccountScreen from '../screens/bottom-tabs/account';
import AccountTabTwoScreen from '../screens/bottom-tabs/account/AccountTabTwoScreen'


const options = {
    headerShown: false
};

const HomeStack = createStackNavigator();

export const HomeTab = () => 
{
    return (
        <HomeStack.Navigator initialRouteName='MovieDetail'>
            <HomeStack.Screen 
                name='Home' 
                component={ HomeScreen } 
                options={ options }
            />
            <HomeStack.Screen 
                name='TabTwo' 
                component={ TabTwoScreen } 
                options={{ headerTitle: 'Home Tab Two', ...options }}
            />
            <HomeStack.Screen 
                name='MovieDetail' 
                component={ MovieDetailsScreen } 
                options={{ headerTitle: 'Movie Details Screen', ...options }}
            />
        </HomeStack.Navigator>
    );
}

const DownloadsStack = createStackNavigator();

export const DownloadsTab = () => 
{
    return (
        <DownloadsStack.Navigator initialRouteName='Home'>
            <DownloadsStack.Screen 
                name='Downloads' 
                component={ DownloadsScreen } 
                options={ options }
            />
            <DownloadsStack.Screen 
                name='DownloadTabTwo' 
                component={ DownloadTabTwoScreen } 
                options={{ headerTitle: 'Downloads Tab Two', ...options }}
            />
        </DownloadsStack.Navigator>
    );
}

const SearchStack = createStackNavigator();

export const SearchTab = () => 
{
    return (
        <SearchStack.Navigator initialRouteName='Search'>
            <SearchStack.Screen 
                name='Search' 
                component={ SearchScreen } 
                options={ options }
            />
            <SearchStack.Screen 
                name='SearchTabTwo' 
                component={ SearchTabTwoScreen }
                options={{ headerTitle: 'Search Tab Two', ...options }} 
            />
        </SearchStack.Navigator>
    );
}

const ComingSoonStack = createStackNavigator();

export const ComingSoonTab = () => 
{
    return (
        <ComingSoonStack.Navigator initialRouteName='ComingSoon'>
            <ComingSoonStack.Screen 
                name='ComingSoon' 
                component={ ComingSoonScreen } 
                options={ options }
            />
            <ComingSoonStack.Screen 
                name='ComingSoonTabTwo' 
                component={ TabTwoScreenCS } 
                options={{ headerTitle: 'Coming Soon Tab Two', ...options }} 
            />
        </ComingSoonStack.Navigator>
    );
}

const AccountSoonStack = createStackNavigator();

export const AccountTab = () => 
{
    return (
        <AccountSoonStack.Navigator initialRouteName='Account'>
            <AccountSoonStack.Screen 
                name='Account' 
                component={ AccountScreen } 
                options={ options }
            />
            <AccountSoonStack.Screen 
                name='AccountTabTwo' 
                component={ AccountTabTwoScreen } 
                options={{ headerTitle: 'Account Tab Two', ...options }} 
            />
        </AccountSoonStack.Navigator>
    );
}