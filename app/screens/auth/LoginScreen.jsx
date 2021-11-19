import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, connect } from 'react-redux'
import { Button, Text, CheckBox } from 'react-native-elements';
import * as AUTH_ACTION from '../../redux/modules/auth/actions'
import styles from './../../assets/stylesheets/loginScreen';
import { View } from 'react-native';
import Colors from './../../constants/Colors';
import { createStructuredSelector } from 'reselect';
import { 
    authSelector, 
    selectAuthErrorMessages, 
    selectAuthHasErrorMessages 
} from './../../redux/modules/auth/selectors'
import { TouchableOpacity } from 'react-native';
import StyledTextInput from './../../components/styled-components/StyledTextInput';
import * as ScreenOrientation from 'expo-screen-orientation';
import LoadingSpinner from './../../components/LoadingSpinner';
import { useFocusEffect } from '@react-navigation/core';
import * as WebBrowser from 'expo-web-browser';
import ENV from './../../../env';


const LoginScreen = ({ AUTH, AUTH_ERROR_MESSAGE, AUTH_HAS_ERROR_MESSAGE, route }) => 
{
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const dispatch = useDispatch();

    const [ isChecked, setIsChecked ] = useState(false);
    const [ credentials, setCredentials ] = useState(AUTH.credentials);
    const [ showPassword, setShowPassword ] = useState(false);

    const handleChange = ({ name, text }) => setCredentials({ ...credentials, [name]: text });

    const handlePressCheckbox = () => {
        setIsChecked(!isChecked);
        setCredentials({ ...credentials, remember_me: !isChecked });
    }

    const handlePressLogin = () => dispatch(AUTH_ACTION.loginStart(credentials));

    const onUnloadUnlockPortrait = async () => await ScreenOrientation.unlockAsync();

    const onLoadLockToPortrait = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    const handlePressHelp = async () => 
    {
        try {
            await WebBrowser.openBrowserAsync(`${ ENV.DEVELOPMENT_MODE_WEB_APP_URL }/help`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => 
    {
        if (route.params?.email) {
            setCredentials({
                ...credentials,
                email: route.params.email
            });
        }

        onLoadLockToPortrait();

        return () => {
            setIsChecked(false);
            setCredentials(AUTH.credentials);
            onUnloadUnlockPortrait();
            setShowPassword(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (Boolean(route.params?.email.length)) {
                inputPasswordRef?.current?.focus();
            } else {
                inputEmailRef?.current?.focus();
            }

            return () => {
                inputEmailRef.current = null;
                inputPasswordRef.current = null;
                dispatch(AUTH_ACTION.clearErrorProperty());
            }
        }, [])
    )

    if (AUTH.isLoading) {
        return <LoadingSpinner message='Signing In' />
    }

    return (
        <View style={ styles.container }>
            <Text h2 style={ styles.title }>Sign in</Text>
            {
                typeof AUTH.errors !== 'object' && <Text style={ styles.errorMessageText }>{ AUTH.errors }</Text>
            }
            <View style={ styles.formContainer }>
                <StyledTextInput
                    ref={ inputEmailRef }
                    placeholder='Email'
                    placeholderTextColor={ Colors.grey }
                    style={ [styles.inputContainerStyle, styles.email] }
                    value={ credentials.email }
                    onChangeText={ text => handleChange({ name: 'email', text }) }
                    error={ AUTH_HAS_ERROR_MESSAGE?.email }
                    helperText={ AUTH_ERROR_MESSAGE?.email }
                />
                <View style={ styles.passwordContainer }>
                    <StyledTextInput
                        ref={ inputPasswordRef }
                        placeholder='Password'
                        placeholderTextColor={ Colors.grey }
                        style={ [styles.inputContainerStyle, styles.password] }
                        value={ credentials.password }
                        onChangeText={ text => handleChange({ name: 'password', text }) }
                        secureTextEntry={ !showPassword }
                        error={ AUTH_HAS_ERROR_MESSAGE?.password }
                        helperText={ AUTH_ERROR_MESSAGE?.password }
                    />
                </View>
            </View>
            <CheckBox
                title={ !showPassword ? 'Show Password' : 'Hide Password' }
                containerStyle={ styles.showPasswordContainer }
                textStyle={ styles.showPasswordText }
                onPress={ () => setShowPassword(! showPassword) }
                checked={ showPassword }
                checkedColor={ Colors.grey }
                iconRight
                iconType='feather'
                checkedIcon='eye'
                uncheckedIcon='eye-off'
                checkedColor='red'
                size={ 28 }
                style={ styles.checkbox }
            />
            <Button title='Sign In' onPress={ handlePressLogin } buttonStyle={ styles.loginBtn } />
            <View style={ styles.loginFooter }>
                <CheckBox
                    title='Remember me'
                    containerStyle={ styles.rememberMeContainer }
                    textStyle={ styles.rememberMeText }
                    onPress={ handlePressCheckbox }
                    checked={ isChecked }
                    checkedColor={ Colors.grey }
                />
                <TouchableOpacity onPress={ handlePressHelp }>
                    <Text style={ styles.needHelp }>Need help?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_ERROR_MESSAGE: selectAuthErrorMessages,
    AUTH_HAS_ERROR_MESSAGE: selectAuthHasErrorMessages
});

export default connect(mapStateToProps)(LoginScreen)