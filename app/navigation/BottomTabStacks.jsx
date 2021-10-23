import React from 'react'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
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
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CreateProfileScreen from './../screens/bottom-tabs/select-profile/CreateProfileScreen';
import ManageProfilesScreen from './../screens/bottom-tabs/select-profile/ManageProfilesScreen';
import EditProfileScreen from './../screens/bottom-tabs/select-profile/EditProfileScreen';
import DisplayVideoScreen from './../screens/DisplayVideoScreen';
import NotificationsScreen from './../screens/bottom-tabs/coming-soon/NotificationsScreen';
import Colors from './../constants/Colors';

const DEFAULT_OPTIONS = {
    headerShown: false,
};

const SelectProfileStack = createStackNavigator();

export const SelectProfileTab = () => 
{
    return (
        <SelectProfileStack.Navigator initialRouteName='SelectProfile'>
            <SelectProfileStack.Screen 
                name='SelectProfile' 
                component={ SelectProfileScreen } 
                options={ DEFAULT_OPTIONS } 
            />
            <SelectProfileStack.Screen 
                name='CreateProfile' 
                component={ CreateProfileScreen } 
                options={ DEFAULT_OPTIONS } 
            />
            <SelectProfileStack.Screen 
                name='EditProfile' 
                component={ EditProfileScreen } 
                options={ DEFAULT_OPTIONS } 
            />
            <SelectProfileStack.Screen 
                name='ManageProfiles' 
                component={ ManageProfilesScreen } 
                options={{ 
                    headerTitle: 'Manage Profiles', 
                    headerStyle: { backgroundColor: '#000000' } 
                }} 
            />
        </SelectProfileStack.Navigator>
    );
}

const HomeStack = createStackNavigator();

export const HomeTab = ({ navigation }) => 
{
    return (
        <HomeStack.Navigator initialRouteName='Home'>
            <HomeStack.Screen 
                name='Home' 
                component={ HomeScreen } 
                options={ DEFAULT_OPTIONS }
            />
            <HomeStack.Screen 
                name='MovieDetailScreen' 
                component={ MovieDetailsScreen } 
                options={({ route }) => ({ 
                    headerTitle: props => <AppBar showLogo={ false } headerTitle={ '' } />,
                    headerStyle: {
                        backgroundColor: '#000'
                    }, 
                })}
            />
            <HomeStack.Screen 
                name='MyListScreen'
                component={ MyListScreen }
                options={({ route }) => ({
                    headerTitle: props => <AppBar showAvatar={ false } showLogo={ false } headerTitle={ route.params.headerTitle } />,
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                })}
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
    const SEARCH_SCREEN_OPTIONS = { 
        headerLeft: props => <StackNavBackButton { ...props } />,
        headerRight: props => <StackNavAvatar />,
        headerRightContainerStyle: {
            paddingRight: 9
        },
        headerStyle: {
            backgroundColor: '#000'
        },
        headerTitle: ''
    };

    return (
        <SearchStack.Navigator initialRouteName='Search'>
            <SearchStack.Screen 
                name='Search' 
                component={ SearchScreen } 
                options={ SEARCH_SCREEN_OPTIONS } 
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
                options={ DEFAULT_OPTIONS }
            />
            <ComingSoonStack.Screen 
                name='NotificationsScreen' 
                component={ NotificationsScreen }
                options={{ 
                    headerTitle: 'Notifications',
                    headerStyle: {
                        backgroundColor: Colors.dark
                    }
                }}
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
                options={ DEFAULT_OPTIONS }
            />
            <DownloadsStack.Screen 
                name='MoreDownloads' 
                component={ MoreDownloadsScreen } 
                options={({ route }) => ({ headerTitle: route.params.headerTitle })}
            />
        </DownloadsStack.Navigator>
    );
}

const DisplayVideoStack = createStackNavigator();

export const DisplayVideoTab = () => 
{    
    return (
        <DisplayVideoStack.Navigator initialRouteName='DisplayVideoScreen'>
            <DisplayVideoStack.Screen 
                name='DisplayVideoScreen' 
                component={ DisplayVideoScreen } 
                options={ DEFAULT_OPTIONS }
                initialParams={{ 
                    id: '',
                    videoUri: null,
                    title: ''
                }}
            />
        </DisplayVideoStack.Navigator>
    );
}