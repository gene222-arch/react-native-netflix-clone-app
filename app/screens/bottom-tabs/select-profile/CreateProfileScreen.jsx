import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import View from '../../../components/View';
import Text from '../../../components/Text';
import Image from './../../../components/Image';
import { Switch } from 'react-native-elements';
import Colors from './../../../constants/Colors';
import styles from './../../../assets/stylesheets/createProfile';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ProfileAppBar from './ProfileAppBar';
import { useDispatch, connect } from 'react-redux';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import { authSelector, selectAuthErrorMessages, selectAuthHasErrorMessages } from '../../../redux/modules/auth/selectors';
import { createStructuredSelector } from 'reselect';
import LoadingSpinner from '../../../components/LoadingSpinner';
import StyledTextInput from './../../../components/styled-components/StyledTextInput';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AvatarList from './AvatarList';
import avatarUris from './../../../services/app-avatar-uris/avatar.uris';

const PROFILE_DEFAULT_PROPS = { 
    id: '', 
    name: '', 
    is_for_kids: false,
    avatar: avatarUris[0],
    avatar_file: null
};

const CreateProfileScreen = ({ AUTH, AUTH_ERROR_MESSAGE, AUTH_HAS_ERROR_MESSAGE }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ profile, setProfile ] = useState(PROFILE_DEFAULT_PROPS);
    const [ showAvatars, setShowAvatars ] = useState(false);

    const handlePressCreateProfile = async () => {
        Keyboard.dismiss();
        dispatch(AUTH_ACTION.createProfileStart(profile));
    }

    const handlePressChangeAvatar = (avatarUri) => {
        setProfile({ ...profile, avatar: avatarUri });
        setShowAvatars(false);
    } 

    const handleClickBackButton = () => 
    {
        setShowAvatars(false);
        
        if (! showAvatars) {
            navigation.goBack();
        }
    }

    useEffect(() => {
        return () => {
            setProfile(PROFILE_DEFAULT_PROPS);
            setShowAvatars(false);
            dispatch(AUTH_ACTION.clearErrorProperty());
        }
    }, []);
    
    return (
        <>
            <LoadingSpinner isLoading={ AUTH.isLoading } />
            <ProfileAppBar 
                headerTitle='Create Profile' 
                onPress={ handlePressCreateProfile } 
                onBackArrowClick={ handleClickBackButton }
                showSaveButton={ !showAvatars }
            />
            {
                showAvatars
                    ? (
                        <AvatarList
                            handlePress={ handlePressChangeAvatar } 
                            profile={ profile } 
                            setProfile={ setProfile }
                        />
                    )
                    : (
                        <View style={ styles.container }>    
                            <TouchableOpacity onPress={ () => setShowAvatars(true) }>
                                <View style={ styles.imgContainer }>
                                    <Image 
                                        source={{ uri: profile.avatar }}
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
                                <Text style={ styles.switchLabel } >For Kids</Text>
                                <Switch  
                                    value={ profile.is_for_kids }
                                    onValueChange={ () => setProfile({ ...profile, is_for_kids: !profile.is_for_kids }) }
                                    style={ styles.switch }
                                />
                            </View>
                        </View>
                    )
            }
            
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_ERROR_MESSAGE: selectAuthErrorMessages,
    AUTH_HAS_ERROR_MESSAGE: selectAuthHasErrorMessages
});

export default connect(mapStateToProps)(CreateProfileScreen)
