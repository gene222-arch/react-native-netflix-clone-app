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

const PROFILE_DEFAULT_PROPS = { 
    id: '', 
    name: '', 
    is_for_kids: false,
    avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png'
};

const CreateProfileScreen = ({ AUTH, AUTH_ERROR_MESSAGE, AUTH_HAS_ERROR_MESSAGE }) => 
{
    const dispatch = useDispatch();

    const [ profile, setProfile ] = useState(PROFILE_DEFAULT_PROPS);

    const handlePressCreateProfile = () => {
        Keyboard.dismiss();
        dispatch(AUTH_ACTION.createProfileStart(profile));
    }

    useEffect(() => {
        return () => {
            setProfile(PROFILE_DEFAULT_PROPS);
            dispatch(AUTH_ACTION.clearErrorProperty());
        }
    }, []);
    
    return (
        <>
            <LoadingSpinner isLoading={ AUTH.isLoading } />
            <ProfileAppBar headerTitle='Create Profile' onPress={ handlePressCreateProfile } />
            <View style={ styles.container }>
                <View style={ styles.imgContainer }>
                    <Image 
                        source={{ 
                            uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png' 
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
                        color={ Colors.grey }
                        style={ styles.switch }
                    />
                </View>
            </View>
            
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_ERROR_MESSAGE: selectAuthErrorMessages,
    AUTH_HAS_ERROR_MESSAGE: selectAuthHasErrorMessages
});

export default connect(mapStateToProps)(CreateProfileScreen)
