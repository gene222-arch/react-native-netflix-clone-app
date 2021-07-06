import React from 'react'
import { Image, TouchableOpacity, FlatList } from 'react-native'
import View from '../../../components/View';
import Text from '../../../components/Text';
import styles from './../../../assets/stylesheets/manageProfiles';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../redux/modules/auth/selectors';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import SelectProfileItem from './../../../components/select-profile-item/SelectProfileItem';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


const ManageProfilesScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handlePressSelectProfile = (selectedProfile) => {

        const profile = {
            id: selectedProfile.id,
            name: selectedProfile.name,
            is_for_kids: selectedProfile.is_for_kids,
            profile_photo: selectedProfile.profile_photo,
        };

        navigation.navigate('EditProfile', { profile })
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.profilesContainer }>
                <FlatList 
                    data={ AUTH.profiles }
                    numColumns={ 2 }
                    renderItem={ ({ item, index }) => (
                        <View style={ styles.profileContainer }>
                            <SelectProfileItem 
                                key={ item.id }
                                styles={ styles } 
                                item={ item } 
                                handlePressSelectProfile={ handlePressSelectProfile } 
                            />
                            <FontAwesome5Icon 
                                name='pen'
                                color='#FFF'
                                size={ 24 }
                                style={ styles.editIcon }
                                onPress={ () => handlePressSelectProfile(item) }
                            />
                        </View>
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

export default connect(mapStateToProps)(ManageProfilesScreen)
