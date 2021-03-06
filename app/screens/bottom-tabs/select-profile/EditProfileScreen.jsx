import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import View from '../../../components/View';
import Text from '../../../components/Text';
import Image from '../../../components/Image';
import { Switch } from 'react-native-elements';
import Colors from '../../../constants/Colors';
import styles from '../../../assets/stylesheets/createProfile';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import ProfileAppBar from './ProfileAppBar';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authSelector, selectAuthErrorMessages, selectAuthHasErrorMessages } from '../../../redux/modules/auth/selectors';
import { Button } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import PopUpDialog from './../../../components/PopUpDialog';
import LoadingSpinner from './../../../components/LoadingSpinner';
import StyledTextInput from './../../../components/styled-components/StyledTextInput';
import AvatarList from './AvatarList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { authProfileSelector } from './../../../redux/modules/auth/selectors';

const EditProfileScreen = ({ AUTH, AUTH_PROFILE, route, AUTH_ERROR_MESSAGE, AUTH_HAS_ERROR_MESSAGE }) => 
{
    const dispatch = useDispatch();
    const { id } = route.params;
    const navigation = useNavigation();

    const [ profile, setProfile ] = useState(AUTH.profiles.find(prof => prof.id === id));
    const [ showDeleteProfileDialog, setShowDeleteProfileDialog ] = useState(false);
    const [ showAvatars, setShowAvatars ] = useState(false);
    const [ showProfileCantBeRemove, setShowProfileCantBeRemove ] = useState(false);

    const handlePressUpdateProfile = () => dispatch(AUTH_ACTION.updateAuthenticatedProfileStart(profile));

    const handlePressDeleteProfile = () => {
        dispatch(AUTH_ACTION.deleteProfileStart(id));
        navigation.dispatch(StackActions.replace('SelectProfile', {params: {}}));
    }

    const handlePressChangeAvatar = (avatarUri) => {
        setProfile({ ...profile, previous_avatar: profile.avatar, avatar: avatarUri });
        setShowAvatars(false);
    } 

    const toggleDeleteProfileDialog = () => 
    {    
        if (parseInt(id) === AUTH_PROFILE.id) {
            setShowProfileCantBeRemove(true);
        }

        if (parseInt(id) !== AUTH_PROFILE.id) {
            setShowProfileCantBeRemove(false);
            setShowDeleteProfileDialog(! showDeleteProfileDialog);
        }
    }

    const handleClickBackButton = () => {
        setShowAvatars(false);

        if (! showAvatars) {
            navigation.goBack();
        }
    }

    useEffect(() => {
        return () => {
            dispatch(AUTH_ACTION.clearErrorProperty());
            setShowDeleteProfileDialog(false);
            setShowAvatars(false);
            setProfile(AUTH.profile);
        }
    }, []);

    if (showAvatars) 
    {
        return (
            <>
                <ProfileAppBar  
                    isLoading={ AUTH.isLoading }
                    headerTitle='Edit Profile' 
                    showSaveButton={ false }
                    onPress={ handlePressUpdateProfile } 
                    onBackArrowClick={ handleClickBackButton }
                />
                <AvatarList
                    handlePress={ handlePressChangeAvatar } 
                    profile={ profile } 
                    setProfile={ setProfile } 
                />
            </>
        )
    }

    return (
        <ScrollView>
            <LoadingSpinner isLoading={ AUTH.isLoading } />
            <PopUpDialog 
                textQuery="Are you sure you want to delete this profile? This profile's history will be gone forever
                and you won't be able  to access it again."
                textCancel="Cancel"
                textConfirm="Delete Profile"
                isVisible={ showDeleteProfileDialog }
                onBackdropPress={ toggleDeleteProfileDialog }
                onPressCancel={ toggleDeleteProfileDialog }
                onPressConfirm={ handlePressDeleteProfile }
            />
            <PopUpDialog 
                textQuery="Profile is in used, thus cannot be deleted permanently."
                textCancel=""
                textConfirm="Ok"
                isVisible={ showProfileCantBeRemove }
                onBackdropPress={ () => 1 }
                onPressCancel={ () => 1 }
                onPressConfirm={ () => setShowProfileCantBeRemove(false) }
            />
            <ProfileAppBar
                headerTitle='Edit Profile' 
                onPress={ handlePressUpdateProfile } 
                onBackArrowClick={ handleClickBackButton }
            />
            <View style={ styles.inputContainer }>
                <View style={ styles.container }>
                    <TouchableOpacity onPress={ () => setShowAvatars(true) }>
                        <View style={ styles.imgContainer }>
                            <Image 
                                source={{ 
                                    uri: profile.avatar
                                }}
                                style={ styles.image }
                            />
                            <FontAwesome5Icon 
                                name='pen-square'
                                size={ 30 }
                                color='#FFFFFF'
                                style={ styles.imgIcon }
                            />
                        </View>
                    </TouchableOpacity>
                    <StyledTextInput 
                        value={ profile.name }
                        onChangeText={ (textInput) => setProfile({ ...profile, name: textInput }) }
                        style={ styles.input }
                        error={ AUTH_HAS_ERROR_MESSAGE.name }
                        helperText={ AUTH_ERROR_MESSAGE.name }
                    />
                    <View style={ styles.switchContainer }>
                        <Text style={ styles.switchLabel }>For Kids</Text>
                        <Switch  
                            value={ Boolean(profile.is_for_kids) }
                            onValueChange={ () => setProfile({ ...profile, is_for_kids: !profile.is_for_kids }) }
                            color={ Colors.grey }
                            style={ styles.switch }
                        />
                    </View>
                </View>

                <Button 
                    type='clear'
                    title='  Delete Profile'
                    icon={
                        <FeatherIcon 
                            name='trash-2'
                            size={ 24 }
                            color='#FFF'
                        />
                    }
                    iconPosition='left'
                    buttonStyle={ styles.deleteProfileBtn }
                    onPress={ toggleDeleteProfileDialog }
                    titleStyle={ styles.deleteBtnTitle }
                />
            </View>
                    
        </ScrollView>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector,
    AUTH_ERROR_MESSAGE: selectAuthErrorMessages,
    AUTH_HAS_ERROR_MESSAGE: selectAuthHasErrorMessages
});

export default connect(mapStateToProps)(EditProfileScreen)
