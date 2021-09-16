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
import Colors from './../constants/Colors';

const InputPinCodeOverlay = ({ AUTH, pinCode, isVisible, hasError, onChangeText, onCancel }) => 
{
    return (
        <Overlay 
            isVisible={ isVisible }
            overlayStyle={ styles.pinCodeOverLay } //
        >
            <View style={ styles.inputPinCodeContainer }>
                <Text style={ styles.statement }>
                    { !hasError ? 'Enter your PIN to access this profile' : 'Incorrect PIN. Please try again.' }
                </Text>
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
                    />
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
