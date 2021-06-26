import React, { useRef } from 'react'
import View from './../components/View';
import Text from './../components/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Avatar } from 'react-native-elements';
import styles from './../assets/stylesheets/appBar';
import Image from './../components/Image';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'

const AppBar = ({ showLogo = true, headerTitle = '', marginTop = 0 }) => 
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
                        style={ styles.searchIcon }
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={ navigateToAccountScreen }>
                    <Avatar
                        source={{
                            uri:
                            'data:image/png;base64,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',
                        }}
                        avatarStyle={ styles.avatarIcon }
                    />
                </TouchableOpacity>
            </View>
        </View>     
    )
}

export default AppBar
