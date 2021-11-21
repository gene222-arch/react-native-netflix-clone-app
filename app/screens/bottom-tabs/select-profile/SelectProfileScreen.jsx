import React, { useState, useEffect, useCallback } from 'react'
import { Image, TouchableOpacity, FlatList, InteractionManager } from 'react-native'
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
import * as SUBSCRIBED_SUCCESSFULLY_EVENT from './../../../events/subscribed.successfully.event'
import * as SUBSCRIBER_PROFILE_CREATED_EVENT from './../../../events/subscriber.profile.created.event'
import * as SUBSCRIBER_PROFILE_UPDATED_EVENT from './../../../events/subscriber.profile.updated.event'
import * as SUBSCRIBER_PROFILE_DELETED_EVENT from './../../../events/subscriber.profile.deleted.event'
import * as SUBSCRIBER_PROFILE_DISABLED_EVENT from './../../../events/subscriber.profile.disabled.event'
import InputPinCodeOverlay from './../../../components/InputPinCodeOverlay';
import * as Network from 'expo-network';
import { useFocusEffect } from '@react-navigation/core';
import * as ALERT_UTIL from './../../../utils/alert'
import PopUpDialog from './../../../components/PopUpDialog';

const NETWORK_DEFAULT_PROPS = {
    isConnected: false,
    isInternetReachable: false,
    type: ''
};

const SelectProfileScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const authenticatedUserId = AUTH.auth.user.id;

    const [ profileId, setProfileId ] = useState('');
    const [ pinCode, setPinCode ] = useState('');
    const [ showPinCodeModal, setShowPinCodeModal ] = useState(false);
    const [ selectedProfilePinCode, setSelectedProfilePinCode ] = useState('');
    const [ isInCorrectPin, setIsInCorrectPin ] = useState(false);
    const [ networkState, setNetworkState ] = useState(NETWORK_DEFAULT_PROPS);
    const [ isClickable, setIsClickable ] = useState(false);

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

    const handlePressSelectProfile = (item) => 
    {
        if (! networkState.isConnected) {
            alert("There's no internet connection")
        }

        if (! networkState.isInternetReachable) {
            alert("Internet connection not reachable")
        }

        if (isClickable) {
            (! item.is_profile_locked)
                ? selectProfile(item.id)
                : handleTogglePinCodeModal(item.pin_code, item.id);
        }
    }

    const handlePressManageProfiles = () => navigation.navigate('ManageProfiles');

    const onLoadSetProfileNumberLimit = () => 
    {
        const totalActiveProfiles = AUTH.profiles.filter(({ enabled }) => enabled).length;
        let profileCountToDisable_ = 0;

        switch (AUTH.subscription_details.type) 
        {
            case 'Premium':
                profileCountToDisable_ = (5 - totalActiveProfiles);
                break;
        
            case 'Standard':
                profileCountToDisable_ = (4 - totalActiveProfiles);
                break;

            case 'Basic':
                profileCountToDisable_ = (2 - totalActiveProfiles);
                break;
        }

        if (Math.sign(profileCountToDisable_) === -1) {
            dispatch(AUTH_ACTION.setProfileCountToDisable({ profileCount: Math.abs(profileCountToDisable_) }));
        }

        if (Math.sign(profileCountToDisable_) !== -1) {
            dispatch(AUTH_ACTION.setProfileCountToDisable({ profileCount: 0 }));
        }
    }

    useEffect(() => 
    {
        InteractionManager.runAfterInteractions(async () => 
        {
            const network = await Network.getNetworkStateAsync();
            setNetworkState(network);

            if (AUTH.subscription_details.is_expired) {
                ALERT_UTIL.okAlert('Subscription', 'Your subscribtion has expired');
            }

            if (! network.isConnected) {
                ALERT_UTIL.okAlert('Connection Error', 'There`s a problem with your internet connection');
            }
    
            if (! network.isInternetReachable) {
                ALERT_UTIL.okAlert('Connection Error', 'No signal')
            }

            if (network.isConnected && network.isInternetReachable) 
            {
                const isClickable = network.isConnected && network.isInternetReachable && !AUTH.subscription_details.is_expired;
                setIsClickable(isClickable);
                
                dispatch(AUTH_ACTION.showSubscriberStart());

                USER_PROFILE_PIN_CODE_UPDATED_EVENT.listen(authenticatedUserId, response => {
                    dispatch(AUTH_ACTION.updateUserProfile(response.data));
                    setSelectedProfilePinCode(response.data.pin_code);
                });

                SUBSCRIBER_PROFILE_CREATED_EVENT.listen(authenticatedUserId, response => {
                    if (response.platform === 'web') {
                        dispatch(AUTH_ACTION.broadcastCreateProfile({
                            profile: response.data
                        }));
                    }
                });

                SUBSCRIBER_PROFILE_UPDATED_EVENT.listen(authenticatedUserId, response => {
                    if (response.platform === 'web') {
                        dispatch(AUTH_ACTION.broadcastUpdateProfile({
                            profile: response.data
                        }));
                    }
                });

                SUBSCRIBER_PROFILE_DELETED_EVENT.listen(authenticatedUserId, response => {
                    if (response.platform === 'web') {
                        dispatch(AUTH_ACTION.broadcastDeleteProfileById({
                            id: response.data.profileId
                        }));
                    }
                });

                SUBSCRIBER_PROFILE_DISABLED_EVENT.listen(authenticatedUserId, response => {
                    dispatch(AUTH_ACTION.disableProfile({
                        profileIds: response.data.profileIds
                    }));
                });
            }
        });

        return () => {
            USER_PROFILE_PIN_CODE_UPDATED_EVENT.unListen(authenticatedUserId);
            SUBSCRIBER_PROFILE_CREATED_EVENT.unListen(authenticatedUserId);
            SUBSCRIBER_PROFILE_UPDATED_EVENT.unListen(authenticatedUserId);
            SUBSCRIBER_PROFILE_DELETED_EVENT.unListen(authenticatedUserId);
            SUBSCRIBER_PROFILE_DISABLED_EVENT.unListen(authenticatedUserId);
            setShowPinCodeModal(false);
            setSelectedProfilePinCode('');
            setIsInCorrectPin(false);
            setProfileId('');
            handleChangePin('');
            setIsClickable(false);
        }
    }, []);

    useEffect(() => 
    {
        onLoadSetProfileNumberLimit();
        
        SUBSCRIBED_SUCCESSFULLY_EVENT.listen(authenticatedUserId, response => {
            dispatch(AUTH_ACTION.updateSubscriptionDetails({
                subscription_details: response.data
            }));
        });

        return () => {
            SUBSCRIBED_SUCCESSFULLY_EVENT.unListen(authenticatedUserId);
        }
    }, [AUTH.subscription_details, AUTH.profileCountToDisable]);

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
            <PopUpDialog 
                textQuery={ `Please disable at least ${ AUTH.profileCountToDisable } profiles in order to continue your streaming.` }
                textCancel=''
                textConfirm=''
                isVisible={ Boolean(AUTH.profileCountToDisable) }
            />
            <LoadingSpinner isLoading={ AUTH.isLoading } />
            {/* Header */}
            <View style={ styles.header }>
                <Text></Text>
                <Image 
                    source={NAV_LOGO}
                    style={ styles.appLogoImg }
                />
                <TouchableOpacity 
                    onPress={ handlePressManageProfiles } 
                    disabled={ !isClickable }
                >
                    <FontAwesome5 
                        name='pen'
                        size={ 24 }
                        color='#FFF'
                        style={{ opacity: !isClickable ? 0.3 : 1 }}
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
                    renderItem={ ({ item, index }) => (
                        <DisplayProfile
                            profile={ item }
                            handlePressSelectProfile={ () => handlePressSelectProfile(item)}
                            index={ index }
                            isClickable={ isClickable }
                            profileCountToDisable={ AUTH.profileCountToDisable }
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
