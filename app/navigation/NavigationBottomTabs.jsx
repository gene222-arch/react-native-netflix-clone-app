import React from 'react'
import { StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

/** Screens */
import { HomeTab, ComingSoonTab, SearchTab, DownloadsTab, AccountTab } from './BottomTabStacks'
import Colors from './../constants/Colors';


const Tab = createBottomTabNavigator();

const NavigationBottomTabs = () => 
{
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.white
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={ HomeTab } 
                options={{
                    tabBarIcon: (({ color }) => (
                        <MaterialIcons 
                            name='home' 
                            size={ 24 } 
                            color={ color }
                            style={ styles.tabBarIcon }
                        />
                    ))
                }}
            />
            <Tab.Screen 
                name="Coming soon" 
                component={ ComingSoonTab } 
                options={{
                    tabBarIcon: (({ color }) => (
                        <MaterialIcons 
                            name='video-library' 
                            size={ 24 } 
                            color={ color }
                            style={ styles.tabBarIcon }
                        />
                    ))
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={ SearchTab } 
                options={{
                    tabBarIcon: (({ color }) => (
                        <MaterialIcons 
                            name='youtube-searched-for' 
                            size={ 24 } 
                            color={ color }
                            style={ styles.tabBarIcon }
                        />
                    ))
                }}
            />
            <Tab.Screen 
                name="Downloads" 
                component={ DownloadsTab } 
                options={{
                    tabBarIcon: (({ color }) => (
                        <FeatherIcon 
                            name='download' 
                            size={ 24 } 
                            color={ color }
                            style={ styles.tabBarIcon }
                        />
                    ))
                }}
            />
            <Tab.Screen 
                name="Account" 
                component={ AccountTab } 
                options={{
                    tabBarIcon: (({ color }) => (
                        <MaterialIcons 
                            name='account-circle' 
                            size={ 24 } 
                            color={ color }
                            style={ styles.tabBarIcon }
                        />
                    ))
                }}
            />
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    tabBarIcon: {
    }
});

export default NavigationBottomTabs