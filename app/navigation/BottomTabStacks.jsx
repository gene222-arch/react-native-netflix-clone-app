import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/bottom-tabs/home';
import MovieDetailsScreen from './../screens/bottom-tabs/home/movie-details-screen/index';
import TabTwoScreen from '../screens/bottom-tabs/home/TabTwoScreen';
import DownloadsScreen from '../screens/bottom-tabs/downloads';
import MoreDownloadsScreen from '../screens/bottom-tabs/downloads/MoreDownloadsScreen';
import SearchScreen from '../screens/bottom-tabs/search';
import SearchTabTwoScreen from '../screens/bottom-tabs/search/SearchTabTwoScreen';
import ComingSoonScreen from '../screens/bottom-tabs/coming-soon';
import TabTwoScreenCS from '../screens/bottom-tabs/coming-soon/TabTwoScreenCS';
import MoreScreen from '../screens/bottom-tabs/more'
import MoreTabTwoScreen from '../screens/bottom-tabs/more/MoreTabTwoScreen'
import MyListScreen from './../screens/bottom-tabs/home/home-categories-menus/MyListScreen';
import AppBar from './../screens/AppBar';
import CategoriesScreen from './../screens/bottom-tabs/home/home-categories-menus/CategoriesScreen';
import StackNavBackButton from './../components/stack-app-bar/StackNavBackButton';
import StackNavAvatar from './../components/stack-app-bar/StackNavAvatar';
import StackNavTitle from './../components/stack-app-bar/StackNavTitle';


const options = {
    headerShown: false
};

const searchOptions = { 
    headerLeft: props => <StackNavBackButton />,
    headerRight: props => <StackNavAvatar />,
    headerRightContainerStyle: {
        paddingRight: 9
    },
    headerStyle: {
        backgroundColor: '#000'
    },
    headerTitle: ''
};

const moreHeaderOptions = { 
    headerLeft: props => <StackNavBackButton />,
    headerTitle: 'Profiles & More'
};

const HomeStack = createStackNavigator();

export const HomeTab = () => 
{
    return (
        <HomeStack.Navigator initialRouteName='Home'>
            <HomeStack.Screen 
                name='Home' 
                component={ HomeScreen } 
                options={{ ...options, headerShown: false }}
            />
            <HomeStack.Screen 
                name='TabTwo' 
                component={ TabTwoScreen } 
                options={ options }
            />
            <HomeStack.Screen 
                name='MovieDetailScreen' 
                component={ MovieDetailsScreen } 
                options={{ ...options, headerShown: true, headerTitle: '' }}
            />
            <HomeStack.Screen 
                name='MyListScreen'
                component={ MyListScreen }
                options={{ 
                    headerTitle: props => <AppBar showLogo={ false } headerTitle='Categories'/>,
                    headerStyle: {
                        backgroundColor: '#000',
                        
                    },
                }}
            />
            <HomeStack.Screen 
                name='CategoriesScreen'
                component={ CategoriesScreen }
                options={({ route }) => ({ 
                    headerTitle: props => <AppBar showLogo={ false } headerTitle={ route.params.headerTitle }/>,
                    headerStyle: {
                        backgroundColor: '#000',
                        
                    },
                })}
            />
        </HomeStack.Navigator>
    );
}

const SearchStack = createStackNavigator();

export const SearchTab = () => 
{
    return (
        <SearchStack.Navigator initialRouteName='SearchScreen'>
            <SearchStack.Screen 
                name='SearchScreen' 
                component={ SearchScreen } 
                options={ searchOptions } 
            />
            <SearchStack.Screen 
                name='SearchTabTwo' 
                component={ SearchTabTwoScreen }
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
                options={ options } 
            />
        </ComingSoonStack.Navigator>
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
                name='MoreDownloads' 
                component={ MoreDownloadsScreen } 
                options={({ route }) => ({ headerTitle: route.params.headerTitle })}
            />
        </DownloadsStack.Navigator>
    );
}

const AccountSoonStack = createStackNavigator();

export const MoreTab = () => 
{
    return (
        <AccountSoonStack.Navigator initialRouteName='More'>
            <AccountSoonStack.Screen 
                name='More' 
                component={ MoreScreen } 
                options={ moreHeaderOptions }
            />
            <AccountSoonStack.Screen 
                name='MoreTabTwo' 
                component={ MoreTabTwoScreen } 
                options={ options } 
            />
        </AccountSoonStack.Navigator>
    );
}