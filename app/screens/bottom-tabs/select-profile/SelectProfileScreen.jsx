import React from 'react'
import { Image, TouchableOpacity, FlatList } from 'react-native'
import View from '../../../components/View';
import Text from '../../../components/Text';
import styles from './../../../assets/stylesheets/selectProfile';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../redux/modules/auth/selectors';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import SelectProfileItem from './../../../components/select-profile-item/SelectProfileItem';

const MAXIMUM_PROFILES = 5;

const DisplayProfiles = ({ profileID, profile, handlePressSelectProfile, handlePressCreateProfile, numberOfProfiles, index }) => 
{
    const profileCountIsEqualToIndex = (numberOfProfiles + 1) !== (index + 1);

    if (profileCountIsEqualToIndex) {
        return (
            <SelectProfileItem 
                key={ profileID }
                styles={ styles } 
                item={ profile } 
                handlePressSelectProfile={ handlePressSelectProfile } 
            />
        )
    } else {
        if (numberOfProfiles !== MAXIMUM_PROFILES) {
            return (
                <View style={ styles.createProfileContainer }>
                    <TouchableOpacity onPress={ handlePressCreateProfile }>
                        <FontAwesome5Icon 
                            name='plus-circle'
                            size={ 60 }
                            color='#FFFFFF'
                            style={ styles.createProfileIcon }
                        />
                        <Text h5 style={ styles.createProfileText }>Add Profile</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const SelectProfileScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handlePressManageProfiles = () => navigation.navigate('ManageProfiles');
    const handlePressCreateProfile = () => navigation.navigate('CreateProfile');

    const handlePressSelectProfile = (profile) => dispatch(AUTH_ACTION.selectProfileStart({ id: profile.id }));

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Text></Text>
                <Image 
                    source={{
                        uri: 'https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png'
                    }}
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
            <View style={ styles.profilesContainer }>
                <Text h4 style={ styles.whosWatchingText }>Who's Watching?</Text>
                <FlatList 
                    data={ [...AUTH.profiles, { id: '' }] }
                    numColumns={ 2 }
                    renderItem={ ({ item, index }) => (
                        <DisplayProfiles 
                            profileID={ item.id }
                            index={ index }
                            numberOfProfiles={ AUTH.profiles.length }
                            profile={ item }
                            handlePressSelectProfile={ handlePressSelectProfile }
                            handlePressCreateProfile={ handlePressCreateProfile }
                        />
                    )}
                    columnWrapperStyle={{
                        justifyContent: 'space-between'
                    }}
                />
            </View>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(SelectProfileScreen)
