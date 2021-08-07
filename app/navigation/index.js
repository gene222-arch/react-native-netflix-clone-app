import React, { useEffect } from 'react'
import { ActivityIndicator, ToastAndroid } from 'react-native'
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
import { toastSelector } from './../redux/modules/toast/selectors';


enableScreens(true);

const Navigation = ({ AUTH, TOAST }) => 
{

    useEffect(() => {
        if (TOAST.message) {
            ToastAndroid.show(
                TOAST.message, 
                TOAST.toastAndroid === 'SHORT'
                    ? ToastAndroid.SHORT 
                    : ToastAndroid.LONG
            )
        }
    }, [TOAST]);

    return (
        <NavigationContainer ref={ navigationRef } theme={ DarkTheme } fallback={ <ActivityIndicator color='#fff' /> }>
            { !AUTH.isAuthenticated ? <AuthenticationStack /> : <NavigationBottomTabs /> }
            <StatusBar style='light' backgroundColor='transparent'/>
        </NavigationContainer>  
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    TOAST: toastSelector
})

export default connect(mapStateToProps)(Navigation)