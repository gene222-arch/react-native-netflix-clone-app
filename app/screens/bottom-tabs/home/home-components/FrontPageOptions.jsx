import React, { useState, useEffect, useMemo } from 'react'
import { TouchableOpacity, ToastAndroid } from 'react-native'
import { Button } from 'react-native-elements'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import styles from './../../../../assets/stylesheets/homeScreen';
import { getCachedFile } from './../../../../utils/cacheImage';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect, useDispatch } from 'react-redux';
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions';
import Info from './../../../../components/continue-watching-for-item/Info';
import { Image } from 'react-native-expo-image-cache';
import { useNavigation } from '@react-navigation/native';

const Genre = ({ genres }) => 
{
    return (
        genres.map((genre, index) => (
            <Text key={ index } style={ styles.tagItem }>
                { (genres.length - 1) !== index ? `${ genre }  · ` : genre }
            </Text>
        ))
    )
}

const FrontPageOptions = ({ AUTH_PROFILE, frontPage }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ showMovieInfo, setShowMovieInfo ] = useState(false);
    
    const genres = useMemo(() => frontPage?.genres.split(','), [ frontPage?.genres ]);

    const handlePressNavigateToDisplayVideo = () => navigation.navigate('DisplayVideo', { 
        videoUri: frontPage?.trailer_video_path, 
        id: frontPage?.id 
    });

    const handleToggleAddToMyList = () => 
    {
        dispatch(AUTH_ACTION.toggleAddToMyListStart(frontPage));

        const movieExists = AUTH_PROFILE.my_list.find(({ id }) => id === frontPage?.id);
        const message = movieExists ? 'Removed from My List' : 'Added to My List';

        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    useEffect(() => {
        return () => {
            setShowMovieInfo(false);
        }
    }, []);

    return (
        <View style={ styles.frontPageOptions }>
            <Info 
                selectedShow={ frontPage } 
                isVisible={ showMovieInfo } 
                setIsVisible={ setShowMovieInfo } 
            />
    
            <Image 
                preview={{ uri: frontPage.title_logo_path }}
                uri={ frontPage.title_logo_path }
                style={ styles.homeFrontPageShowLogo }
            />

            <View style={ styles.tagsContainer }>
                { genres && <Genre genres={ genres } /> }
            </View>

            <View style={ styles.actionBtnsContainer }>
                <TouchableOpacity onPress={ handleToggleAddToMyList }>
                    <View style={ styles.myListInfoActionContainer }>
                        <FeatherIcon 
                            name={ AUTH_PROFILE.my_list.find(({ id }) => id === frontPage?.id) ? 'check' : 'plus' }
                            size={ 24 }
                            color='#fff'
                        />
                        <Text style={ styles.myListInfoActionText }>My List</Text>
                    </View>
                </TouchableOpacity>
                <Button 
                    title='   Play'
                    icon={
                        <FontAwesome5 
                            name='play'
                            size={ 16 }
                            color='#000'
                        />
                    }
                    iconPosition='left'
                    onPress={ handlePressNavigateToDisplayVideo }
                    buttonStyle={ styles.playBtn }
                    titleStyle={ styles.playBtnTitle }
                />
                <View style={ styles.myListInfoActionContainer }>
                    <TouchableOpacity onPress={ () => setShowMovieInfo(!showMovieInfo) }>
                        <FeatherIcon 
                            name='info'
                            size={ 24 }
                            color='#fff'
                        />
                        <Text style={ styles.myListInfoActionText }>Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
}); 

export default connect(mapStateToProps)(FrontPageOptions)
