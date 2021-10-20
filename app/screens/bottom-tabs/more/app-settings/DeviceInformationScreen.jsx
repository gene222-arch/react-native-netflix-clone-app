import React from 'react'
import View from './../../../../components/View';
import { ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native'
import Colors from './../../../../constants/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Device from 'expo-device';
import { ScrollView } from 'react-native-gesture-handler';


const DeviceInformationScreen = () => 
{
    const list = 
    [
        {
            title: 'Device',
            icon: 'smartphone',
            subTitle: Device.deviceName
        },
        {
            title: 'Brand',
            icon: 'smartphone',
            subTitle: Device.brand
        },
        {
            title: 'Manufacturer',
            icon: 'tool',
            subTitle: Device.manufacturer
        },
        {
            title: 'Model ID',
            icon: 'hard-drive',
            subTitle: Device.modelId
        },
        {
            title: 'Model',
            icon: 'hard-drive',
            subTitle: Device.modelName
        },
        {
            title: 'Design Name',
            icon: 'codesandbox',
            subTitle: Device.designName
        },
        {
            title: 'Year Class',
            icon: 'calendar',
            subTitle: Device.deviceYearClass
        },
        {
            title: 'Memory',
            icon: 'database',
            subTitle: `${ (Device.totalMemory / (1024 * 1024 * 1024)).toFixed(2) } Gb`
        },
        {
            title: 'OS',
            icon: 'cpu',
            subTitle: `${ Device.osName } ${ Device.osVersion }`,
        },
        {
            title: 'Support',
            icon: 'cpu',
            subTitle: Device.supportedCpuArchitectures,
        }
    ];

    return (
        <ScrollView>
            <FeatherIcon 
                name='smartphone'
                color={ Colors.grey }
                size={ 100 }
                style={ styles.smartphoneIcon }
            />
            {
                list.map(({ title, icon, subTitle }, index) => (
                    <ListItem 
                        key={ index } 
                        bottomDivider 
                        containerStyle={ styles.listItemContainer }
                    >
                        <FeatherIcon 
                            name={ icon }
                            color={ Colors.grey }
                            size={ 20 }
                        />
                        <ListItem.Content>
                            <ListItem.Title style={ styles.listTitle }>{ title }</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content>
                            <ListItem.Subtitle style={ styles.subTitle }>{ subTitle }</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </ScrollView>
    )
}

export default DeviceInformationScreen

const styles = StyleSheet.create({
    listItemContainer: {
        backgroundColor: Colors.darkMode,
        color: Colors.grey
    },
    listTitle: {
        color: Colors.grey,
        fontSize: 15
    },
    smartphoneIcon: {
        width: '100%',
        textAlign: 'center',
        paddingVertical: 20
    },  
    subTitle: {
        color: Colors.grey,
        opacity: 0.7
    }
});