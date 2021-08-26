import React, { useEffect } from 'react'
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
import DisplayProfile from '../../../components/select-profile-item';
import LoadingSpinner from '../../../components/LoadingSpinner';
import NAV_LOGO from './../../../assets/logotop.png'


const SelectProfileScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handlePressManageProfiles = () => navigation.navigate('ManageProfiles');

    const handlePressSelectProfile = (id) => dispatch(AUTH_ACTION.selectProfileStart({ id }));

    return (
        <View style={ styles.container }>
            <LoadingSpinner isLoading={ AUTH.isLoading } />
            {/* Header */}
            <View style={ styles.header }>
                <Text></Text>
                <Image 
                    source={NAV_LOGO}
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
            
            {/* Profile List */}   
            <View style={ styles.profilesContainer }>
                <Text h4 style={ styles.whosWatchingText }>Who's Watching?</Text>
                <FlatList 
                    keyExtractor={ (item, index) => index.toString() }
                    data={[ ...AUTH.profiles, { id: '' } ]}
                    numColumns={ 2 }
                    renderItem={ ({ item, index }) => index !== 5 && (
                        <DisplayProfile
                            key={ index }
                            profile={ item }
                            handlePressSelectProfile={ () => handlePressSelectProfile(item.id) }
                            index={ index }
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
