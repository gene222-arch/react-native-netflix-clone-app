import React, { useState, useEffect, useCallback } from 'react'
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
import * as USER_PROFILE_PIN_CODE_UPDATED_EVENT from './../../../events/user.profile.pin.code.updated.event'
import InputPinCodeOverlay from './../../../components/InputPinCodeOverlay';
import { useFocusEffect } from '@react-navigation/core';


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
        setSelectedProfilePinCode(pinCode);
        setProfileId(id);
    }

    const handleClickCancel = () => 
    {
        setIsInCorrectPin(false);
        setShowPinCodeModal(false);
        setSelectedProfilePinCode('');
        setProfileId('');
        handleChangePin('');
    }

    const handlePressManageProfiles = () => navigation.navigate('ManageProfiles');

    useEffect(() => 
    {
        USER_PROFILE_PIN_CODE_UPDATED_EVENT.listen(response => {
            dispatch(AUTH_ACTION.updateUserProfile(response.data));
            setSelectedProfilePinCode(response.data.pin_code);
        });

        return () => {
            USER_PROFILE_PIN_CODE_UPDATED_EVENT.unListen();
            setShowPinCodeModal(false);
            setSelectedProfilePinCode('');
            setIsInCorrectPin(false);
            setProfileId('');
            handleChangePin('');
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setPinCode('');
            }
        }, [])
    )

    return (
        <View style={ styles.container }>
            <InputPinCodeOverlay 
                profileId={ profileId }
                isVisible={ showPinCodeModal }
                setIsVisible={ setShowPinCodeModal }
                pinCode={ pinCode }
                hasError={ isInCorrectPin }
                onChangeText={ handleChangePin }
                onCancel={ handleClickCancel }
            />
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
