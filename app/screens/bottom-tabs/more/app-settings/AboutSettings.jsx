import React from 'react'
import View from './../../../../components/View';
import { ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native'
import Colors from './../../../../constants/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStructuredSelector } from 'reselect';
import { userSelector, authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStoreInstance from './../../../../utils/SecureStoreInstance'
import { useNavigation } from '@react-navigation/native';
import ENV from './../../../../../env';

const AboutSettings = ({ AUTH_PROFILE, USER }) => 
{
    const navigation = useNavigation();

    const handlePressAccountSettings = async () => 
    {
        try {
            const accessToken = await SecureStoreInstance.getAccessToken();
            const queryParams = `?token=${ accessToken }&profileId=${ AUTH_PROFILE.id }&path=home`;
    
            await WebBrowser.openBrowserAsync(ENV.REACT_APP_URL + queryParams);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePressAbout = () => navigation.navigate('DeviceInformationScreen', { headerTitle: 'Device Information' });

    const list = 
    [
        {
            title: 'About',
            icon: 'smartphone',
            subTitle: '',
            endIcon: '',
            onPress: handlePressAbout
        },
        {
            title: 'Account',
            icon: 'user',
            subTitle: USER.email,
            endIcon: 'external-link',
            onPress: handlePressAccountSettings
        }
    ];

    return (
        <View>
            {
                list.map(({ title, icon, subTitle, endIcon, onPress }, index) => (
                    <ListItem 
                        key={ index } 
                        bottomDivider 
                        containerStyle={ styles.listItemContainer } 
                        onPress={ onPress }
                    >
                        <FeatherIcon 
                            name={ icon }
                            color={ Colors.grey }
                            size={ 20 }
                        />
                        <ListItem.Content>
                            <ListItem.Title style={ styles.listTitle }>{ title }</ListItem.Title>
                            {
                                Boolean(subTitle) && <ListItem.Subtitle style={ styles.subTitle }>{ subTitle }</ListItem.Subtitle>
                            }
                        </ListItem.Content>
                        {
                            Boolean(endIcon) && (
                                <FeatherIcon 
                                    name={ endIcon }
                                    color={ Colors.grey }
                                    size={ 20 }
                                />
                            )
                        }
                    </ListItem>
                ))
            }
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    USER: userSelector
});

export default connect(mapStateToProps)(AboutSettings)

const styles = StyleSheet.create({
    listItemContainer: {
        backgroundColor: Colors.darkMode,
        color: Colors.grey
    },
    listTitle: {
        color: Colors.grey,
        fontSize: 15
    },
    subTitle: {
        color: Colors.grey,
        opacity: 0.7
    }
});