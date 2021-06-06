import React from 'react'
import { useSelector } from 'react-redux' 
import { DarkTheme, NavigationContainer, DefaultTheme } from '@react-navigation/native';

/** Components */
import NavigationBottomTabs from './NavigationBottomTabs';
import AuthenticationStack from './AuthenticationStack';
import { navigationRef } from './RootNavigation';
import { useColorScheme } from 'react-native';

const Navigation = () => 
{
    const auth = useSelector(state => state.auth);
    const scheme = useColorScheme();

    return (
        <NavigationContainer ref={ navigationRef } theme={ DarkTheme }>
        {
            !auth.isAuthenticated ? <AuthenticationStack /> : <NavigationBottomTabs />
        }
        </NavigationContainer>  
    )
}

export default Navigation