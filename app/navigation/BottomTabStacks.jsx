import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/bottom-tabs/home';
import MovieDetailsScreen from './../screens/bottom-tabs/home/movie-details-screen/index';
import DownloadsScreen from '../screens/bottom-tabs/downloads';
import MoreDownloadsScreen from '../screens/bottom-tabs/downloads/MoreDownloadsScreen';
import SearchScreen from '../screens/bottom-tabs/search';
import ComingSoonScreen from '../screens/bottom-tabs/coming-soon';
import MoreScreen from '../screens/bottom-tabs/more'
import MyListScreen from './../screens/bottom-tabs/home/home-categories-menus/MyListScreen';
import AppBar from './../screens/AppBar';
import CategoriesScreen from './../screens/bottom-tabs/home/home-categories-menus/CategoriesScreen';
import StackNavBackButton from './../components/stack-app-bar/StackNavBackButton';
import StackNavAvatar from './../components/stack-app-bar/StackNavAvatar';
import SelectProfileScreen from './../screens/bottom-tabs/select-profile/SelectProfileScreen';
import TrailerInfo from './../screens/bottom-tabs/coming-soon/TrailerInfo';

const options = {
    headerShown: false,
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

const SelectProfileStack = createStackNavigator();

export const SelectProfileTab = () => 
{
    return (
        <SelectProfileStack.Navigator initialRouteName='SelectProfile'>
            <SelectProfileStack.Screen 
                name='SelectProfile' 
                component={ SelectProfileScreen } 
                options={ options } 
            />
        </SelectProfileStack.Navigator>
    );
}

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
                name='MovieDetailScreen' 
                component={ MovieDetailsScreen } 
                options={({ route }) => ({ headerTitle: route.params.headerTitle })}
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
        <SearchStack.Navigator initialRouteName='Search'>
            <SearchStack.Screen 
                name='Search' 
                component={ SearchScreen } 
                options={ searchOptions } 
            />
        </SearchStack.Navigator>
    );
}

const ComingSoonStack = createStackNavigator();

export const ComingSoonTab = () => 
{
    const comingSoonOptions = {
        headerTitle: '',
        headerStyle: {
            backgroundColor: '#000'
        }
    };

    return (
        <ComingSoonStack.Navigator initialRouteName='ComingSoon'>
            <ComingSoonStack.Screen 
                name='ComingSoon' 
                component={ ComingSoonScreen } 
                options={ options }
            />
            <ComingSoonStack.Screen 
                name='TrailerInfo'
                component={ TrailerInfo }
                options={ comingSoonOptions }
            />
        </ComingSoonStack.Navigator>
    );
}

const DownloadsStack = createStackNavigator();

export const DownloadsTab = () => 
{
    return (
        <DownloadsStack.Navigator initialRouteName='Downloads'>
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
        </AccountSoonStack.Navigator>
    );
}