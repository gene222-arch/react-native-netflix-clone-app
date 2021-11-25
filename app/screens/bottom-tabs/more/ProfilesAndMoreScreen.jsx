import React, { useState, useEffect } from 'react'
import { useDispatch, connect, batch } from 'react-redux'
import { FlatList, TouchableOpacity} from 'react-native'
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'
import * as TOAST_ACTION from '../../../redux/modules/toast/actions'
import styles from '../../../assets/stylesheets/moreScreen';
import ProfilePhotoItem from '../../../components/profile-photo-item/ProfilePhotoItem';
import View from '../../../components/View';
import { Overlay, Button } from 'react-native-elements';
import Text from '../../../components/Text';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createStructuredSelector } from 'reselect';
import { authSelector, authProfileSelector, selectOrderedProfiles } from '../../../redux/modules/auth/selectors';
import { useNavigation } from '@react-navigation/native';
import DisplayOption from '../../../components/more-screen-display-option/DisplayOption';
import LoadingSpinner from '../../../components/LoadingSpinner'
import Echo from '../../../utils/echo'
import InputPinCodeOverlay from '../../../components/InputPinCodeOverlay';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStoreInstance from './../../../utils/SecureStoreInstance'
import ENV from './../../../../env';
import { useIsFocused } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import Colors from './../../../constants/Colors';

const moreOptions = ({ onPressSignOut, onPressMyList, onPressAccount, onPressAppSettings, onPressHelp }) =>
[
    {
        id: 1,
        name: 'My List',
        Icon: <FontAwesome5 name='check' size={ 15 } color={ styles.manageProfilesBtnIcon.color }/>,
        bottomDivider: true,
        onPress: () => onPressMyList()
    },
    {
        id: 2,
        name: 'App Settings',
        Icon: null,
        bottomDivider: false,
        onPress: () => onPressAppSettings()
    },
    {
        id: 3,
        name: 'Account',
        Icon: null,
        bottomDivider: false,
        onPress: () => onPressAccount()
    },
    {
        id: 4,
        name: 'Help',
        Icon: null,
        bottomDivider: false,
        onPress: () => onPressHelp()
    },
    {
        id: 5,
        name: 'Sign Out',
        Icon: null,
        bottomDivider: false,
        onPress: () => onPressSignOut()
    }
];

const ProfilesAndMoreScreen = ({ AUTH, AUTH_PROFILE, ORDERED_PROFILES }) => 
{
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isAccountAccessible = !([ 'expired', 'cancelled', 'pending' ].includes(AUTH.subscription_details.type));

    const [ showSignOutDialog, setShowSignOutDialog ] = useState(false);
    const [ profileId, setProfileId ] = useState('');
    const [ pinCode, setPinCode ] = useState('');
    const [ showPinCodeModal, setShowPinCodeModal ] = useState(false);
    const [ selectedProfilePinCode, setSelectedProfilePinCode ] = useState('');
    const [ isInCorrectPin, setIsInCorrectPin ] = useState(false);

    const selectProfile = (id) => dispatch(AUTH_ACTION.selectProfileStart({ id }));

    const handlePressAccountSettings = async () => 
    {
        try {
            const accessToken = await SecureStoreInstance.getAccessToken();

            const queryParams = `?token=${ accessToken }&profileId=${ AUTH_PROFILE.id }&path=home`;
    
            await WebBrowser.openBrowserAsync(ENV.DEVELOPMENT_MODE_WEB_APP_URL + queryParams);
        } catch (error) {
            console.log(error);
        }
    }

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

    const togglePinCodeModal = (pinCode, id) => 
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

    const handlePressSignOut = async () => {
        batch(() => {
            dispatch(TOAST_ACTION.createToastMessageStart({
                message: 'Signing Out',
                toastAndroid: 'SHORT',
            }));
            dispatch(AUTH_ACTION.logoutStart());
        });

        (await Echo()).disconnect();
    }

    const handlePressHelp = async () => 
    {
        try {
            await WebBrowser.openBrowserAsync(`${ ENV.DEVELOPMENT_MODE_WEB_APP_URL }/help`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickProfile = (profile) => {
        if (profile.enabled) {
            (!profile.is_profile_locked)
                ? selectProfile(profile.id)
                : togglePinCodeModal(profile.pin_code, profile.id) 
        }
    }

    const toggleSignOutDialog = () => setShowSignOutDialog(! showSignOutDialog);

    const handlePressMyList = () => navigation.navigate('MyListScreen', { headerTitle: 'My List' });

    const handlePressAppSettings = () => navigation.navigate('AppSettingsScreen', { headerTitle: 'App Settings' });

    const moreOptionsHandler = { 
        onPressSignOut: toggleSignOutDialog, 
        onPressMyList: handlePressMyList,
        onPressAccount: handlePressAccountSettings,
        onPressAppSettings: handlePressAppSettings,
        onPressHelp: handlePressHelp
    };

    useEffect(() => {
        return () => {
            setShowSignOutDialog(false);
            setShowPinCodeModal(false);
            setSelectedProfilePinCode('');
            setIsInCorrectPin(false);
            setProfileId('');
            handleChangePin('');
        }
    }, [AUTH_PROFILE]); 

    return (
        <View style={ styles.container }>
            { isFocused && <StatusBar backgroundColor={ Colors.dark } /> }
            <InputPinCodeOverlay 
                profileId={ profileId }
                isVisible={ showPinCodeModal }
                setIsVisible={ setShowPinCodeModal }
                pinCode={ pinCode }
                hasError={ isInCorrectPin }
                onChangeText={ handleChangePin }
                onCancel={ handleClickCancel }
            />
            <LoadingSpinner isLoading={ AUTH.isLoading && isFocused } />
            {/* Sign out Dialog */}
            <Overlay isVisible={ showSignOutDialog } onBackdropPress={ toggleSignOutDialog } overlayStyle={ styles.signOutDialog }>
                <Text style={ styles.signOutQuery }>Sign out from this account?</Text>
                <View style={ styles.signOutDialogActionBtns }>
                    <TouchableOpacity onPress={ toggleSignOutDialog } disabled={ AUTH.isLoading } >
                        <Text style={ styles.cancelSignOut }>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ handlePressSignOut } disabled={ AUTH.isLoading }>
                        <Text style={ styles.signOut }>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            
            {/* Profiles */}
            <View style={ styles.profileContainer }>
                <FlatList
                    keyExtractor={ (item, index) => index.toString() }
                    data={ ORDERED_PROFILES }
                    renderItem={ ({ item, index }) => (
                        <ProfilePhotoItem 
                            key={ index }
                            profile={ item }
                            isSelected={ AUTH_PROFILE.id === item.id }
                            onPress={ () => handleClickProfile(item) }
                            isAccessible={ isAccountAccessible }
                        />
                    )}
                    horizontal
                />
            </View>
            
            {/* Manage Profiles Btn */}
            <View style={ styles.manageProfilesContainer }>
                <Button
                    type='clear'
                    icon={
                        <FontAwesome5
                            name='pen'
                            size={15}
                            color={ styles.manageProfilesBtnIcon.color }
                        />
                    }
                    title='   Manage Profiles'
                    titleStyle={ styles.manageProfilesBtnTitle }
                    onPress={ () => navigation.navigate('ManageProfiles') }
                />
            </View>
            
            <View style={ styles.lists }>
                {
                    moreOptions(moreOptionsHandler)
                        .map(({ id, name, Icon, bottomDivider, onPress }) => (
                            <DisplayOption 
                                key={ id }
                                onPress={ onPress }
                                name={ name }
                                Icon={ Icon }
                                bottomDivider={ bottomDivider }
                            />
                        ))
                }
            </View>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector,
    ORDERED_PROFILES: selectOrderedProfiles
});

export default connect(mapStateToProps)(ProfilesAndMoreScreen)