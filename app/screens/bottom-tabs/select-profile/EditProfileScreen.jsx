import React, { useState, useEffect } from 'react'
import { TextInput, ActivityIndicator } from 'react-native'
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
import { authSelector } from '../../../redux/modules/auth/selectors';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../../../constants/Dimensions';
import { Button } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import PopUpDialog from './../../../components/PopUpDialog';

const DEFAULT_PROFILE = {
    id: '',
    name: '',
    is_for_kids: false,
    profile_photo: ''
}

const EditProfileScreen = ({ AUTH, route }) => 
{
    const dispatch = useDispatch();
    const routeProfile = route.params.profile;

    const [ profile, setProfile ] = useState({ 
        id: routeProfile.id,
        name: routeProfile.name, 
        is_for_kids: routeProfile.is_for_kids,
        profile_photo: routeProfile.profile_photo
    });
    const [ showDeleteProfileDialog, setShowDeleteProfileDialog ] = useState(false);

    const handlePressUpdateProfile = () => dispatch(AUTH_ACTION.updateAuthenticatedProfileStart(profile));

    const handlePressDeleteProfile = () => dispatch(AUTH_ACTION.deleteProfileStart(routeProfile.id));

    const toggleDeleteProfileDialog = () => setShowDeleteProfileDialog(!showDeleteProfileDialog);

    useEffect(() => {
        return () => {
            setProfile(DEFAULT_PROFILE);
            setShowDeleteProfileDialog(false);
        }
    }, []);

    return (
        <>
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
            { AUTH.isLoading && <ActivityIndicator color='#FFF' style={{
                position: 'absolute',
                left: DEVICE_WIDTH / 2,
                top: DEVICE_HEIGHT / 2,
                width: 100
            }} /> }
            <ProfileAppBar headerTitle='Edit Profile' onPress={ handlePressUpdateProfile } />
            <View style={ styles.inputContainer }>
                <View style={ styles.container }>
                    <View style={ styles.imgContainer }>
                        <Image 
                            source={{ 
                                uri: routeProfile.profile_photo
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
                    <TextInput 
                        value={ profile.name }
                        onChangeText={ (textInput) => setProfile({ ...profile, name: textInput }) }
                        style={ styles.input }
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
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(EditProfileScreen)
