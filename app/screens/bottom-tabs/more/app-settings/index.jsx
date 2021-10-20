import React from 'react'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import { StyleSheet } from 'react-native';
import AboutSettings from './AboutSettings';
import LegalSettings from './LegalSettings';

const SettingsContainer = ({ title, component: Component }) => 
{
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
        title: 'Trips',
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
