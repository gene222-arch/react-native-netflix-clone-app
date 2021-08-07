import React, { useState, useEffect } from 'react'
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import StyledTextInput from './../../components/styled-components/StyledTextInput';
import * as ScreenOrientation from 'expo-screen-orientation';
import LoadingSpinner from './../../components/LoadingSpinner';


const LoginScreen = ({ AUTH, AUTH_ERROR_MESSAGE, AUTH_HAS_ERROR_MESSAGE }) => 
{
    const dispatch = useDispatch();

    const [ isChecked, setIsChecked ] = useState(false);
    const [ credentials, setCredentials ] = useState(AUTH.credentials)

    const handleChange = ({ name, text }) => setCredentials({ ...credentials, [name]: text });

    const handlePressCheckbox = () => {
        setIsChecked(!isChecked);
        setCredentials({ ...credentials, remember_me: !isChecked });
    }

    const login = () => dispatch(AUTH_ACTION.loginStart(credentials));

    useEffect(() => 
    {
        const onLoadLockToPortrait = async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
        
        onLoadLockToPortrait();

        return () => {
            setIsChecked(false);
            setCredentials(AUTH.credentials);
        }
    }, []);

    if (AUTH.isLoading) {
        return <LoadingSpinner message='Signing In' />
    }

    return (
        <View style={ styles.container }>
            <Text h2 style={ styles.title }>Sign in</Text>

            <View style={ styles.formContainer }>
                <StyledTextInput
                    placeholder='Email'
                    placeholderTextColor={ Colors.grey }
                    style={ [styles.inputContainerStyle, styles.email] }
                    value={ credentials.email }
                    onChangeText={ text => handleChange({ name: 'email', text }) }
                    error={ AUTH_HAS_ERROR_MESSAGE.email }
                    helperText={ AUTH_ERROR_MESSAGE.email }
                />

                <StyledTextInput
                    placeholder='Password'
                    placeholderTextColor={ Colors.grey }
                    style={ styles.inputContainerStyle }
                    value={ credentials.password }
                    onChangeText={ text => handleChange({ name: 'password', text }) }
                    secureTextEntry
                    error={ AUTH_HAS_ERROR_MESSAGE.password }
                    helperText={ AUTH_ERROR_MESSAGE.password }
                />
            </View>

            <Button title='Sign in' onPress={ login } buttonStyle={ styles.loginBtn } />

            <View style={ styles.loginFooter }>
                <CheckBox
                    title='Remember me'
                    containerStyle={ styles.rememberMeContainer }
                    textStyle={ styles.rememberMeText }
                    onPress={ handlePressCheckbox }
                    checked={ isChecked }
                    checkedColor={ Colors.grey }
                />
                <TouchableOpacity>
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