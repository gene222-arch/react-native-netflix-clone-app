import React, { useRef } from 'react'
import { connect } from 'react-redux'
import View from './../components/View';
import Text from './../components/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Avatar } from 'react-native-elements';
import styles from './../assets/stylesheets/appBar';
import Image from './../components/Image';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../redux/modules/auth/selectors';

const AppBar = ({ AUTH, showAvatar = true, showLogo = true, headerTitle = '', marginTop = 0 }) => 
{
    const navigation = useNavigation();
    const offsetY = useRef(0);

    const navigatoToSearchScreen = () => navigation.navigate('Search');

    const navigateToAccountScreen = () => navigation.navigate('More');

    const appBarStyles = {
        ...styles.appBarContainer,
        marginTop
    };

    return (
        <View
            style={appBarStyles} 
            onLayout={({ nativeEvent }) => offsetY.current = nativeEvent.layout.y }
        >
            { !showLogo && <Text h4>{ headerTitle }</Text> }
            {
                showLogo && (
                    <Image 
                        source={{
                            uri: 'https://pngimg.com/uploads/netflix/netflix_PNG15.png'
                        }}
                        style={ styles.netflixLogo }
                    />
                )
            }
            <View style={ styles.searchIconContainer }>
                <TouchableOpacity onPress={ navigatoToSearchScreen }>
                    <FeatherIcon 
                        name='search'
                        size={ 34 }
                        color='#fff'
                        style={{
                            marginRight: showAvatar ? 30 : 0
                        }}
                    />
                </TouchableOpacity>
                {
                    showAvatar && (
                        <TouchableOpacity onPress={ navigateToAccountScreen }>
                            <Avatar
                                source={{
                                    uri: AUTH.profile.profile_photo,
                                }}
                                avatarStyle={ styles.avatarIcon }
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>     
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(AppBar)
