import React from 'react'
import { DarkTheme, NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { authSelector } from './../redux/modules/auth/selectors'

/** Components */
import NavigationBottomTabs from './NavigationBottomTabs';
import AuthenticationStack from './AuthenticationStack';
import { navigationRef } from './RootNavigation';
import { useColorScheme } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const Navigation = ({ AUTH }) => 
{
    const scheme = useColorScheme();

    return (
        <NavigationContainer ref={ navigationRef } theme={ DarkTheme }>
        {
            !AUTH.isAuthenticated ? <AuthenticationStack /> : <NavigationBottomTabs />
        }
        </NavigationContainer>  
    )
}

const mapStateToProps = (state) => createStructuredSelector({
    AUTH: authSelector
})

export default connect(mapStateToProps)(Navigation)