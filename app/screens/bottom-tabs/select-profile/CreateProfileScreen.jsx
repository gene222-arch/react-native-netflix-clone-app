import React, { useState } from 'react'
import { TextInput } from 'react-native'
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
import { authSelector } from '../../../redux/modules/auth/selectors';
import { createStructuredSelector } from 'reselect';


const CreateProfileScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();

    const [ profile, setProfile ] = useState({ 
            id: (AUTH.profiles.length + 1), 
            name: '', 
            is_for_kids: false,
            profile_photo: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png'
    });

    const handlePressCreateProfile = () => dispatch(AUTH_ACTION.createProfileStart(profile));
    
    return (
        <>
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
            
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(CreateProfileScreen)
