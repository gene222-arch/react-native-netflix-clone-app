import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect, useDispatch } from 'react-redux';
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions';
import View from '../../../../components/View';
import Text from '../../../../components/Text';
import styles from './../../../../assets/stylesheets/continueWatchingForItem';
import ContinueWatchingForItem from './../../../../components/continue-watching-for-item/ContinueWatchingForItem';
import { cacheImage } from '../../../../utils/cacheImage';


const ContinueWatchingFor = ({ AUTH_PROFILE }) => 
{
    const dispatch  = useDispatch();
    
    const handleToggleRateRecentlyWatchedShow = (show, rate) => dispatch(AUTH_ACTION.rateShowStart({ show, rate }));

    const handlePressRemoveRecentlyWatchedShow = (id) => dispatch(AUTH_ACTION.removeToRecentWatchesStart(id));

    useEffect(() => {
        AUTH_PROFILE.recently_watched_shows.map(({ id, poster, video }) => {
            cacheImage(poster, id, `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/Posters/`);
            cacheImage(video, id, `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/Videos/`);
        });

    }, []);


    if (! (AUTH_PROFILE.recently_watched_shows.length) ) {
        return <Text h4>Your recently watched show's will be shown here.</Text>
    }

    return (
        <View style={ styles.container }>
            <Text h4>Continue Watching For { AUTH_PROFILE.name }</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ AUTH_PROFILE.recently_watched_shows }
                renderItem={({ item }) =>  (
                    <ContinueWatchingForItem 
                        movie={ item } 
                        handleToggleLikeRecentlyWatchedShow={ () => handleToggleRateRecentlyWatchedShow(item, 'like') }
                        handleToggleUnLikeRecentlyWatchedShow={ () => handleToggleRateRecentlyWatchedShow(item, 'not for me') }
                        handlePressRemoveRecentlyWatchedShow={ () => handlePressRemoveRecentlyWatchedShow(item.id) }
                    />
                )}
                horizontal
            />    
        </View>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ContinueWatchingFor)
