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


const SelectProfileScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();

    const handlePressSelectProfile = (id) => dispatch(AUTH_ACTION.selectProfileStart({ id }))

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
                <FontAwesome5 
                    name='pen'
                    size={ 24 }
                    color='#FFF'
                />
            </View>
            <View style={ styles.profilesContainer }>
                <Text h4 style={ styles.whosWatchingText }>Who's Watching?</Text>
                <FlatList 
                    data={ AUTH.profiles }
                    numColumns={ 2 }
                    renderItem={ ({ item }) => (
                        <View style={ styles.profile }>
                            <TouchableOpacity key={ item.id } onPress={ () => handlePressSelectProfile(item.id) }>
                                <Image 
                                    source={{
                                        uri: item.profile_photo
                                    }}
                                    style={ styles.profileImg }
                                />
                                <Text h5 style={ styles.profileName }>{ item.name }</Text>
                            </TouchableOpacity>
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

export default connect(mapStateToProps)(SelectProfileScreen)
