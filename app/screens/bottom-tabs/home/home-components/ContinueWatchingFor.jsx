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
    const recentlyWatchedMovies = AUTH_PROFILE.recently_watched_shows;

    const handleToggleLike = (show) => dispatch(AUTH_ACTION.rateRecentlyWatchedMovieStart({ show, rate: 'like' }));

    const handleToggleDisLike = (show) => dispatch(AUTH_ACTION.rateRecentlyWatchedMovieStart({ show, rate: 'not for me' }));

    const handlePressRemove = (id) => dispatch(AUTH_ACTION.removeToRecentWatchesStart(id));

    useEffect(() => {
        recentlyWatchedMovies.map(({ id, poster_path, video_path }) => {
            cacheImage(poster_path, id, `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/Posters/`);
            cacheImage(video_path, id, `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/Videos/`);
        });
    }, []);


    if (! recentlyWatchedMovies.length) {
        return <Text h4>Your recently watched show's will be shown here.</Text>
    }

    return (
        <View style={ styles.container }>
            <Text h4>Continue Watching For { AUTH_PROFILE.name }</Text>

            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ recentlyWatchedMovies }
                horizontal
                renderItem={({ item }) =>  (
                    <ContinueWatchingForItem 
                        movie={ item } 
                        handleToggleLike={ () => handleToggleLike(item) }
                        handleToggleDisLike={ () => handleToggleDisLike(item) }
                        handlePressRemove={ () => handlePressRemove(item.id) }
                    />
                )}
            />    
        </View>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ContinueWatchingFor)
