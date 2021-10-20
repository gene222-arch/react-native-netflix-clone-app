import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StackNavBackButton from '../components/stack-app-bar/StackNavBackButton';
import ProfilesAndMoreScreen from '../screens/bottom-tabs/more/ProfilesAndMoreScreen';

const Stack = createStackNavigator();

const ProfilesAndMoreStack = () => 
{
    const moreScreenOptions = ({ route }) => ({
        headerLeft: props => <StackNavBackButton { ...props } />,
        headerTitle: 'Profiles & More'
    });
    
    return (
        <Stack.Navigator initialRouteName='More'>
            <Stack.Screen 
                name='More' 
                component={ ProfilesAndMoreScreen } 
                options={ moreScreenOptions }
            />
        </Stack.Navigator>
    );
}

export default ProfilesAndMoreStack
