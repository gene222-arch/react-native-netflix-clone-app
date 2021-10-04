import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Overlay, Input } from 'react-native-elements';
import styles from './../assets/stylesheets/inputPinCodeOverlay';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStructuredSelector } from 'reselect';
import { authSelector } from '../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import View from './View';
import Text from './Text';
import * as WebBrowser from 'expo-web-browser';
import Colors from './../constants/Colors';
import * as SecureStoreInstance from './../utils/SecureStoreInstance'

const InputPinCodeOverlay = ({ AUTH, profileId, pinCode, isVisible, setIsVisible, hasError, onChangeText, onCancel }) => 
{
    const handleClickForgotPinCode = async () => 
    {
        const accessToken = await SecureStoreInstance.getAccessToken();

        const url = `http://192.168.1.225:3000/settings/lock/${ profileId }`;
        const queryParams = `?token=${ accessToken }&profileId=${ profileId }`;

        await WebBrowser.openBrowserAsync(url + queryParams);
        setIsVisible(false);
    }

    return (
        <Overlay 
            isVisible={ isVisible }
            overlayStyle={ styles.pinCodeOverLay } //
        >
            <View style={ styles.inputPinCodeContainer }>
                {
                    !hasError 
                        ? (
                            <Text style={ styles.statement }>
                                Enter your PIN to access this profile
                            </Text>
                        )
                        : (
                            <Text style={ styles.errorText }>
                                Incorrect PIN. Please try again.
                            </Text>
                        )
                }
                {
                    hasError && (
                        <FeatherIcon 
                            name='alert-octagon'
                            size={ 16 }
                            color={ Colors.error }
                            style={ styles.alertIcon }
                        />
                    )
                }
                <View style={ styles.inputAndErrorContainer }>
                    <Input
                        placeholder=' - - - -'
                        value={ pinCode }
                        onChangeText={ onChangeText }
                        inputContainerStyle={ styles.inputContainer }
                        placeholderTextColor='white'
                        inputStyle={ styles.input }
                        secureTextEntry
                        maxLength={ 4 }
                        textAlign='center'
                        autoFocus={ true }
                        keyboardAppearance='dark'
                        keyboardType='number-pad'
                    />
                </View>
                <View style={ styles.forgotPinContainer }>
                    <TouchableOpacity onPress={ handleClickForgotPinCode }>
                        <Text style={ styles.forgotPinText }>Forgot PIN?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={ styles.actionBtnsContainer }>
                <TouchableOpacity onPress={ onCancel } disabled={ AUTH.isLoading }>
                    <Text style={ styles.cancelPinCodeText }>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Overlay>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(InputPinCodeOverlay)
