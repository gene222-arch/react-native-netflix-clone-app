import React, { useCallback, useState, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import { FlatList, Platform, StatusBar } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect } from 'react-redux';

/** Actions */
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import * as COMING_SOON_ACTION from './../../../redux/modules/coming-soon/actions'

/** API */
import notifications from './../../../services/data/notifications';

/** Styles */
import styles from './../../../assets/stylesheets/comingSoon';

/** Selectors */
import { authSelector, authProfileSelector } from './../../../redux/modules/auth/selectors'
import { comingSoonSelector } from './../../../redux/modules/coming-soon/selectors';

/** Components */
import View from './../../../components/View';
import Text from './../../../components/Text';
import NotificationsVideoItem from '../../../components/notifications-video-item';
import AppBar from './../../AppBar';

/** RNV Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { cacheImage } from './../../../utils/cacheImage';
import LoadingScreen from './../../../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';


const ComingSoonScreen = ({ AUTH, AUTH_PROFILE, COMING_SOON }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ focusedIndex, setFocusedIndex ] = useState(0);

    const handleOnScroll = useCallback((e) => {
        const offset = Math.round(e.nativeEvent.contentOffset.y / 500);
        setFocusedIndex(offset);
    }, [setFocusedIndex]);

    const handlePressToggleRemindMe = (comingSoonShowID) => {
        dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart({ comingSoonShowID }));
    }

    const handlePressInfo = (comingSoonShow) => {
        navigation.navigate('TrailerInfo', { comingSoonShow });
    }

    const runAfterInteractions = () => {
        dispatch(COMING_SOON_ACTION.getComingSoonShowsStart(notifications));

        COMING_SOON.comingSoonShows.map(({ id, video, video_poster, poster, title_logo }) => {
            cacheImage(video, id, 'ComingSoon/Videos/');
            cacheImage(poster, id, 'ComingSoon/Posters/');
            cacheImage(video_poster, id, 'ComingSoon/VideoPosters/');
            cacheImage(title_logo, id, 'ComingSoon/TitleLogos/');
        });

        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setFocusedIndex(0);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            cleanUp();
        }
    }, []);

    if (!isInteractionsComplete) {
        return <LoadingScreen />
    }

    return (
        <View style={ styles.container }>
            {/* Coming Soon Videos */}
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                onScroll={ handleOnScroll }
                data={ COMING_SOON.comingSoonShows }
                renderItem={ ({ item, index }) => (
                    <NotificationsVideoItem 
                        comingSoon={ item } 
                        shouldPlay={ false } 
                        shouldShowPoster={ focusedIndex !== index }
                        shouldFocus={ focusedIndex === index }
                        handlePressToggleRemindMe={ () => handlePressToggleRemindMe(item.id) }
                        handlePressInfo={ () => handlePressInfo(item) }
                        isReminded={ AUTH_PROFILE.reminded_coming_soon_shows.includes(item.id) }
                    />
                )}
                ListHeaderComponent={
                    <>
                        {/* Search icon container */}
                        <AppBar 
                            marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } 
                            showLogo={ false } 
                            headerTitle='Coming Soon'
                        />
                        {/* Notifications Container */}
                        <View style={ styles.notificationsContainer }>
                            <View style={ styles.iconContainer }>
                                <FontAwesome5 
                                    name='bell'
                                    size={ 24 }
                                    color='#fff'
                                />
                                <Text style={ styles.notificationsText }>       Notifications</Text>
                            </View>
                            <FeatherIcon 
                                name='chevron-right'
                                size={ 24 }
                                color='#fff'
                            />
                        </View>
                    </>
                }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector,
    COMING_SOON: comingSoonSelector
});

export default connect(mapStateToProps)(ComingSoonScreen)