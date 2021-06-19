import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

/** Screens */
import { HomeTab, ComingSoonTab, SearchTab, DownloadsTab, MoreTab } from './BottomTabStacks'
import Colors from './../constants/Colors';
import LoadingScreen from './../components/LoadingScreen';
import View from './../components/View';


const Tab = createBottomTabNavigator();

const NavigationBottomTabs = () => 
{
    const TAB_BAR_OPTIONS = {
        initialRouteName: 'Home',
        activeTintColor: Colors.white,
        keyboardHidesTabBar: true,
        lazy: true,
        lazyPlaceholder: LoadingScreen
    };

    const HOME_TAB_OPTIONS = {
        tabBarIcon: (({ color }) => (
            <MaterialIcons 
                name='home' 
                size={ 24 } 
                color={ color }
            />
        ))
    };

    const COMING_SOON_OPTIONS = {
        tabBarIcon: (({ color }) => (
            <MaterialIcons 
                name='video-library' 
                size={ 24 } 
                color={ color }
            />
        ))
    };

    const DOWNLOAD_OPTIONS = {
        tabBarIcon: (({ color }) => (
            <FeatherIcon 
                name='download' 
                size={ 24 } 
                color={ color }  
            />
        ))
    };

    const hideTabScreen = {
        tabBarButton: () => <View style={{ width:0, height:0 }}></View>,
        tabBarVisible: false
    };

    return (
        <Tab.Navigator tabBarOptions={ TAB_BAR_OPTIONS }>
            <Tab.Screen 
                name="Home" 
                component={ HomeTab } 
                options={ HOME_TAB_OPTIONS }
            />
            <Tab.Screen 
                name="Search" 
                component={ SearchTab } 
                options={ hideTabScreen }
            />
            <Tab.Screen 
                name="Coming soon" 
                component={ ComingSoonTab } 
                options={ COMING_SOON_OPTIONS }
            />
            <Tab.Screen 
                name="Downloads" 
                component={ DownloadsTab } 
                options={ DOWNLOAD_OPTIONS }
            />
            <Tab.Screen 
                name="More" 
                component={ MoreTab }
                options={ hideTabScreen }
            />
        </Tab.Navigator>
    );
}

export default NavigationBottomTabs