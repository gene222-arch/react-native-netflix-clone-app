import React, { useCallback, useState, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import { FlatList, Platform, StatusBar } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect } from 'react-redux';

/** Actions */
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'

/** API */
import notifications from './../../../services/data/notifications';

/** Styles */
import styles from './../../../assets/stylesheets/comingSoon';

/** Selectors */
import { authSelector } from './../../../redux/modules/auth/selectors'

/** Components */
import View from './../../../components/View';
import Text from './../../../components/Text';
import NotificationsVideoItem from '../../../components/notifications-video-item';
import AppBar from './../../AppBar';

/** RNV Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { cacheImage } from './../../../utils/cacheImage';


const ITEM_HEIGHT = 500;

const ComingSoonScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();

    const [ comingSoonShows, setComingSoonShows ] = useState([]);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ focusedIndex, setFocusedIndex ] = useState(0);

    const handleScroll = useCallback(e => 
    {
        const offset = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        setFocusedIndex(offset);

    }, [setFocusedIndex]);

    const handlePressToggleRemindMe = (comingSoonShowID) => dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart({ comingSoonShowID }));

    
    const runAfterInteractions = () => {

        notifications.map(({ id, video, poster, title_logo }) => {
            cacheImage(video, id, 'ComingSoon/Videos/');
            cacheImage(poster, id, 'ComingSoon/Posters/');
            cacheImage(title_logo, id, 'ComingSoon/TitleLogos/');
        });

        setComingSoonShows(notifications);
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setComingSoonShows([]);
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
        return <Text>Loading ...</Text>
    }

    return (
        <View style={ styles.container }>
            {/* Coming Soon Videos */}
            <FlatList 
                onScroll={handleScroll}
                data={ comingSoonShows }
                renderItem={ ({ item, index }) => (
                    <NotificationsVideoItem 
                        comingSoon={ item } 
                        shouldPlay={ false } 
                        shouldShowPoster={ focusedIndex !== index }
                        shouldFocus={ focusedIndex === index }
                        handlePressToggleRemindMe={ () => handlePressToggleRemindMe(item.id) }
                        isReminded={ AUTH.remindedComingSoonShows.includes(item.id) }
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
    AUTH: authSelector
});

export default connect(mapStateToProps)(ComingSoonScreen)