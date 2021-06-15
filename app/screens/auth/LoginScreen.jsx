import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { Button, Text, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import * as AUTH_ACTION from '../../redux/modules/auth/actions'
import styles from './../../assets/stylesheets/loginScreen';
import { ImageBackground, View, TextInput } from 'react-native';
import Colors from './../../constants/Colors';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../redux/modules/auth/selectors'
import { TouchableOpacity } from 'react-native-gesture-handler';


const LoginScreen = ({ authReducer }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ isChecked, setIsChecked ] = useState(false);
    const [ credentials, setCredentials ] = useState(authReducer.credentials)

    const handleChange = ({ name, text }) => setCredentials({ ...credentials, [name]: text });

    const handlePressCheckbox = () => {
        setIsChecked(!isChecked);
        setCredentials({ ...credentials, remember_me: !isChecked });
    }

    const login = () => dispatch(AUTH_ACTION.loginStart(credentials));

    return (
            <ImageBackground
                source={{ uri: 'https://cdn.hipwallpaper.com/i/98/21/dUyCkp.jpg' }}
                style={ styles.backgroundImg }
            >
                <Text h2 style={ styles.title }>Sign in</Text>
                <TextInput
                    placeholder='Email'
                    placeholderTextColor={ Colors.grey }
                    style={ [styles.inputContainerStyle, styles.email] }
                    onChangeText={ text => handleChange({ name: 'email', text }) }
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor={ Colors.grey }
                    style={ [styles.inputContainerStyle, styles.password] }
                    onChangeText={ text => handleChange({ name: 'password', text }) }
                    secureTextEntry
                />
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
            </ImageBackground>
    );
}

const mapStateToProps = createStructuredSelector({
    authReducer: authSelector
});

export default connect(mapStateToProps)(LoginScreen)