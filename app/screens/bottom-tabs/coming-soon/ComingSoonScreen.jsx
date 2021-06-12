import React, { useCallback, useState, useEffect } from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import styles from './../../../assets/stylesheets/comingSoon';
import Image from './../../../components/Image';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Avatar } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import notifications from './../../../services/data/notifications';
import NotificationsVideoItem from '../../../components/notifications-video-item';
import { FlatList } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../redux/modules/auth/selectors'
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import { useDispatch, connect } from 'react-redux';
import AppBar from './../../AppBar';


const ITEM_HEIGHT = 500;

const ComingSoonScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();

    const [ focusedIndex, setFocusedIndex ] = useState(0);

    const handleScroll = useCallback(e => 
    {
        const offset = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        setFocusedIndex(offset);

    }, [setFocusedIndex]);

    const handlePressToggleRemindMe = (comingSoonShowID) => dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart({ comingSoonShowID }));

    return (
        <View style={ styles.container }>
            {/* Coming Soon Videos */}
            <FlatList 
                onScroll={handleScroll}
                data={ notifications }
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
                        <AppBar showLogo={ false } headerTitle='Coming Soon'/>
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