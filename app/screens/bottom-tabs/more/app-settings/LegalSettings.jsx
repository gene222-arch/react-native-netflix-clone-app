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
import ENV from './../../../../../env';

const AboutSettings = () => 
{
    const handlePressPrivacy = async () => 
    {
        try {
            await WebBrowser.openBrowserAsync(`${ ENV.REACT_APP_URL }/legal/privacy`);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePressCookies = async () => 
    {
        try {
            await WebBrowser.openBrowserAsync(`${ ENV.REACT_APP_URL }/legal/terms-and-conditions`);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePressTermsAndConditions = async () => 
    {
        try {
            await WebBrowser.openBrowserAsync(`${ ENV.REACT_APP_URL }/legal/terms-and-conditions`);
        } catch (error) {
            console.log(error);
        }
    }

    const list = 
    [
        {
            title: 'Privacy',
            icon: 'file-text',
            subTitle: '',
            endIcon: 'external-link',
            onPress: handlePressPrivacy
        },
        {
            title: 'Cookies',
            icon: 'file-text',
            subTitle: '',
            endIcon: 'external-link',
            onPress: handlePressCookies
        },
        {
            title: 'Terms & Conditions',
            icon: 'file-text',
            subTitle: '',
            endIcon: 'external-link',
            onPress: handlePressTermsAndConditions
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