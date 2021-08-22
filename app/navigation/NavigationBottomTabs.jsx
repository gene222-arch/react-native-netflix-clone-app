import React, { useCallback } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

/** Screens */
import { SelectProfileTab, HomeTab, ComingSoonTab, SearchTab, DownloadsTab, MoreTab, DisplayVideoTab } from './BottomTabStacks'
import Colors from './../constants/Colors';
import LoadingScreen from './../components/LoadingScreen';
import View from './../components/View';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import DownloadsTabBarBadge from '../components/bottom-tabs-badges/DownloadsTabBarBadge';
import { createStructuredSelector } from 'reselect';
import { navigationSelector } from './../redux/modules/navigation/selectors';
import { connect } from 'react-redux';
import { comingSoonMoviesSelector } from './../redux/modules/coming-soon/selectors';


const Tab = createBottomTabNavigator();

const NavigationBottomTabs = ({ COMING_SOON_MOVIE, NAVIGATION }) => 
{
    const TAB_NAVIGATOR_OPTIONS = {
        initialRouteName: 'SelectProfile',
        activeTintColor: Colors.white,
        keyboardHidesTabBar: true,
        lazy: true,
        lazyPlaceholder: LoadingScreen
    };

    const HOME_TAB_OPTIONS = ({ route }) => 
    {
        let tabBarVisible = true;
        const currentRouteName = getFocusedRouteNameFromRoute(route);

        tabBarVisible = currentRouteName === 'MyListScreen' ? false : true;
        
        if (tabBarVisible) {
            tabBarVisible = currentRouteName === 'MovieDetailScreen' ? false : true;
        }

        return {
            tabBarIcon: (({ color }) => (
                <MaterialIcons 
                    name='home' 
                    size={ 24 } 
                    color={ color }
                />
            )),
            tabBarVisible
        }
    };

    const COMING_SOON_OPTIONS = useCallback(({ route }) => 
    {
        const tabBarBadgeNumber = COMING_SOON_MOVIE.totalUpcomingMovies;

        const options = {
            tabBarIcon: (({ color }) => (
                <MaterialIcons 
                    name='video-library' 
                    size={ 24 } 
                    color={ color }
                />
            )),
            tabBarVisible: getFocusedRouteNameFromRoute(route) !== 'TrailerInfo'
        };

        if (tabBarBadgeNumber) {
            return ({
                ...options, 
                tabBarBadge: tabBarBadgeNumber,
            });
        }
        
        return options;
        
    }, [COMING_SOON_MOVIE.totalUpcomingMovies]);

    const DOWNLOAD_OPTIONS = ({
        tabBarIcon: (({ color }) => (
            <FeatherIcon 
                name='download' 
                size={ 24 } 
                color={ color }  
            />
        )),
        tabBarBadge: <DownloadsTabBarBadge />,
        tabBarBadgeStyle: {
            backgroundColor: 'transparent'
        },
        tabBarVisible: NAVIGATION.tabBarVisible
    });

    const hideTabScreen = {
        tabBarButton: () => <View style={{ width:0, height:0 }}></View>,
        tabBarVisible: false
    };

    return (
        <Tab.Navigator tabBarOptions={ TAB_NAVIGATOR_OPTIONS } initialRouteName='SelectProfile'>
            <Tab.Screen name='SelectProfile' component={ SelectProfileTab } options={ hideTabScreen } />
            <Tab.Screen name='Home' component={ HomeTab } options={ HOME_TAB_OPTIONS } />
            <Tab.Screen name='Search' component={ SearchTab } options={ hideTabScreen } />
            <Tab.Screen name='Coming soon' component={ ComingSoonTab } options={ COMING_SOON_OPTIONS } />
            <Tab.Screen name='Downloads' component={ DownloadsTab } options={ DOWNLOAD_OPTIONS } />
            <Tab.Screen name='More' component={ MoreTab } options={ hideTabScreen }/>
            <Tab.Screen name='DisplayVideo' component={ DisplayVideoTab } options={ hideTabScreen }/>
        </Tab.Navigator>
    );
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: comingSoonMoviesSelector,
    NAVIGATION: navigationSelector
});

export default connect(mapStateToProps)(NavigationBottomTabs)