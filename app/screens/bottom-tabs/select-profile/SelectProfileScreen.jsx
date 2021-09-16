import React, { useState, useEffect } from 'react'
import { Image, TouchableOpacity, FlatList, Keyboard } from 'react-native'
import View from '../../../components/View';
import Text from '../../../components/Text';
import styles from './../../../assets/stylesheets/selectProfile';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../redux/modules/auth/selectors';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import { useNavigation } from '@react-navigation/native';
import DisplayProfile from '../../../components/select-profile-item';
import LoadingSpinner from '../../../components/LoadingSpinner';
import NAV_LOGO from './../../../assets/logotop.png'
import { Overlay, Input } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from './../../../constants/Colors';


const SelectProfileScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ profileId, setProfileId ] = useState('');
    const [ pinCode, setPinCode ] = useState('');
    const [ showPinCodeModal, setShowPinCodeModal ] = useState(false);
    const [ selectedProfilePinCode, setSelectedProfilePinCode ] = useState('');
    const [ isInCorrectPin, setIsInCorrectPin ] = useState(false);

    const selectProfile = (id) => dispatch(AUTH_ACTION.selectProfileStart({ id }));

    const handleChangePin = (pin) => 
    {
        setPinCode(pin);

        if (pin.length === 4) 
        {
            if (pin === selectedProfilePinCode) {
                selectProfile(profileId);
                setShowPinCodeModal(false);
            } else {
                setIsInCorrectPin(true);
                setPinCode('');
            }
        }
    }

    const handleTogglePinCodeModal = (pinCode, id) => 
    {
        setShowPinCodeModal(! showPinCodeModal);
        setSelectedProfilePinCode(!selectedProfilePinCode ? pinCode : '');
        setProfileId(!profileId ? id : '');
    }

    const handleClickCancel = () => 
    {
        setIsInCorrectPin(false);
        setShowPinCodeModal(false);
        setSelectedProfilePinCode('');
        setProfileId('');
    }

    const handlePressManageProfiles = () => navigation.navigate('ManageProfiles');

    useEffect(() => 
    {
        return () => {
            setShowPinCodeModal(false);
            setSelectedProfilePinCode('');
            setIsInCorrectPin(false);
            setProfileId('');
            handleChangePin('');
        }
    }, []);

    return (
        <View style={ styles.container }>
            <Overlay 
                isVisible={ showPinCodeModal }
                overlayStyle={ styles.pinCodeOverLay }
            >
                <View style={ styles.inputPinCodeContainer }>
                    <Text style={ styles.statement }>
                        { !isInCorrectPin ? 'Enter your PIN to access this profile' : 'Incorrect PIN. Please try again.' }
                    </Text>
                    {
                        isInCorrectPin && (
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
                            onChangeText={ handleChangePin }
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
                    <TouchableOpacity onPress={ handleClickCancel } disabled={ AUTH.isLoading }>
                        <Text style={ styles.cancelPinCodeText }>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            <LoadingSpinner isLoading={ AUTH.isLoading } />
            {/* Header */}
            <View style={ styles.header }>
                <Text></Text>
                <Image 
                    source={NAV_LOGO}
                    style={ styles.appLogoImg }
                />
                <TouchableOpacity onPress={ handlePressManageProfiles }>
                    <FontAwesome5 
                        name='pen'
                        size={ 24 }
                        color='#FFF'
                    />
                </TouchableOpacity>
            </View>
            
            {/* Profile List */}   
            <View style={ styles.profilesContainer }>
                <Text h4 style={ styles.whosWatchingText }>Who's Watching?</Text>
                <FlatList 
                    keyExtractor={ (item, index) => index.toString() }
                    data={[ ...AUTH.profiles, { id: '' } ]}
                    numColumns={ 2 }
                    renderItem={ ({ item, index }) => index !== 5 && (
                        <DisplayProfile
                            key={ index }
                            profile={ item }
                            handlePressSelectProfile={ 
                                () => !item.is_profile_locked
                                    ? selectProfile(item.id)
                                    : handleTogglePinCodeModal(item.pin_code, item.id) 
                            }
                            index={ index }
                        />
                    )}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
            </View>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(SelectProfileScreen)
