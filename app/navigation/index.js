import React from 'react'
import { useSelector } from 'react-redux' 
import { NavigationContainer } from '@react-navigation/native';

/** Components */
import NavigationBottomTabs from './NavigationBottomTabs';
import AuthenticationStack from './AuthenticationStack';
import { navigationRef } from './RootNavigation';

const Navigation = () => 
{
     const auth = useSelector(state => state.auth)

    return (
        <NavigationContainer ref={ navigationRef }>
        {
            !auth.isAuthenticated ? <AuthenticationStack /> : <NavigationBottomTabs />
        }
        </NavigationContainer>  
    )
}

export default Navigation