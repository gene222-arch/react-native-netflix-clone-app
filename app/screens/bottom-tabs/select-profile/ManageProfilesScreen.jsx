import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import View from '../../../components/View';
import styles from './../../../assets/stylesheets/manageProfiles';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../redux/modules/auth/selectors';
import SelectProfileItem from './../../../components/select-profile-item/SelectProfileItem';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


const style = StyleSheet.create({
    img: {
        opacity: .5
    }
});

const ManageProfilesScreen = ({ AUTH }) => 
{
    const navigation = useNavigation();

    const handlePressSelectProfile = (id) => navigation.navigate('EditProfile', { id })

    return (
        <View style={ styles.container }>
            <View style={ styles.profilesContainer }>
                <FlatList 
                    data={ AUTH.profiles.filter(({ enabled }) => enabled) }
                    numColumns={ 2 }
                    renderItem={ ({ item }) => (
                        <View style={ styles.profileContainer }>
                            <SelectProfileItem 
                                key={ item.id }
                                item={ item } 
                                handlePressSelectProfile={ () => handlePressSelectProfile(item.id) } 
                                imageStyle={ style.img }
                            />
                            <FontAwesome5Icon 
                                name='pen'
                                color='#FFF'
                                size={ 24 }
                                style={ styles.editIcon }
                                onPress={ () => handlePressSelectProfile(item.id) }
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
