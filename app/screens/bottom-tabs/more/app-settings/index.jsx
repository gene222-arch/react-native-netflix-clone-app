import React, { useCallback } from 'react'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import { StyleSheet, BackHandler } from 'react-native';
import AboutSettings from './AboutSettings';
import LegalSettings from './LegalSettings';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/core';

const SettingsContainer = ({ title, component: Component }) => 
{
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            BackHandler.removeEventListener('hardwareBackPress', () => true);
            BackHandler.addEventListener('hardwareBackPress', () => {
                navigation.navigate('ProfilesAndMore');
                return true;
            });
        }, [])
    )

    return (
        <View style={ styles.settingsContainer }>
            <Text style={ styles.settingsTitle }>{ title }</Text>
            <Component />
        </View>
    )
}

const list = 
[
    {
        title: 'About',
        component: AboutSettings
    },
    {
        title: 'Legal',
        component: LegalSettings
    }
];

const AppSettingsScreen = () => 
{
    return (
        <View>
            {
                list.map(({ title, component }, index) => (
                    <SettingsContainer 
                        key={ index }
                        title={ title }
                        component={ component }
                    />
                ))
            }
        </View>
    )
}

export default AppSettingsScreen

const styles = StyleSheet.create({
    settingsContainer: {
        marginBottom: 25
    },  
    settingsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10
    }
});
