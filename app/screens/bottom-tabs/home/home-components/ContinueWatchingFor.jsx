import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { createStructuredSelector } from 'reselect';
import { authProfileSelector, authSelector } from './../../../../redux/modules/auth/selectors';
import { connect, useDispatch } from 'react-redux';
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions';
import View from '../../../../components/View';
import Text from '../../../../components/Text';
import styles from './../../../../assets/stylesheets/continueWatchingForItem';
import ContinueWatchingForItem from './../../../../components/continue-watching-for-item/ContinueWatchingForItem';
import { cacheImage } from '../../../../utils/cacheImage';
import TextLoader from './../../../../components/loading-skeletons/TextLoader';


const ContinueWatchingFor = ({ AUTH, AUTH_PROFILE }) => 
{
    const dispatch  = useDispatch();
    
    const { id, name, recently_watched_shows } = AUTH_PROFILE;

    const handleToggleLike = (show) => {
        dispatch(AUTH_ACTION.rateRecentlyWatchedMovieStart({ user_profile_id: id, show, rate: 'like' }));
    }

    const handleToggleDisLike = (show) => {
        dispatch(AUTH_ACTION.rateRecentlyWatchedMovieStart({ user_profile_id: id, show, rate: 'dislike' }));
    }

    const handlePressRemove = (id) => dispatch(AUTH_ACTION.removeToRecentWatchesStart({
        movie_id: id,
        user_profile_id: AUTH_PROFILE.id
    }));

    useEffect(() => {
        recently_watched_shows.map(({ id: movie_id, poster_path, video_path }) => {
            cacheImage(poster_path, movie_id, `RecentlyWatchedShows/Posters/`);
            cacheImage(video_path, movie_id, `RecentlyWatchedShows/Videos/`);
        });
    }, [AUTH_PROFILE.recently_watched_shows]);


    if (! recently_watched_shows.length) {
        return <Text h4>Your recently watched show's will be shown here.</Text>
    }

    return (
        <View style={ styles.container }>
            
            {
                AUTH.isLoading 
                    ? <TextLoader />
                    : <Text h4>Continue Watching For { name }</Text>
            }

            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ recently_watched_shows }
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
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ContinueWatchingFor)
