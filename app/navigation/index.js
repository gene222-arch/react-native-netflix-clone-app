import React from 'react'
import { ActivityIndicator } from 'react-native'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { enableScreens } from 'react-native-screens'
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';

/** Selectors */
import { authSelector } from './../redux/modules/auth/selectors'

/** Components */
import NavigationBottomTabs from './NavigationBottomTabs';
import AuthenticationStack from './AuthenticationStack';
import { navigationRef } from './RootNavigation';


enableScreens(false);
const Navigation = ({ AUTH }) => 
{
    return (
        <NavigationContainer ref={ navigationRef } theme={ DarkTheme } fallback={ <ActivityIndicator color='#fff' /> }>
            { !AUTH.isAuthenticated ? <AuthenticationStack /> : <NavigationBottomTabs /> }
            <StatusBar style='light' backgroundColor='transparent'/>
        </NavigationContainer>  
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
})

export default connect(mapStateToProps)(Navigation)