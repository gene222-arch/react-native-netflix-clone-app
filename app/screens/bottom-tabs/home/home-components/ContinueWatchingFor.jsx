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
import TextLoader from './../../../../components/loading-skeletons/TextLoader';


const ContinueWatchingFor = ({ AUTH, AUTH_PROFILE }) => 
{
    const dispatch  = useDispatch();
    
    const { id, name, recently_watched_movies } = AUTH_PROFILE;

    const handleToggleLike = (movie) => {
        const likePayload = {
            movie,
            user_profile_id: id,
            rate: 'like',
            model_type: 'Movie'
        };

        dispatch(AUTH_ACTION.rateRecentlyWatchedMovieStart(likePayload));
    }

    const handleToggleDisLike = (movie) => {
        const dislikePayload = {
            movie,
            user_profile_id: id,
            rate: 'dislike',
            model_type: 'Movie'
        };

        dispatch(AUTH_ACTION.rateRecentlyWatchedMovieStart(dislikePayload));
    }

    const handlePressRemoveRate = (movie) => {
        const likePayload = {
            movie,
            user_profile_id: id,
            rate: '',
            model_type: 'Movie'
        };

        dispatch(AUTH_ACTION.rateRecentlyWatchedMovieStart(likePayload));
    }

    const handlePressRemove = (id) => dispatch(AUTH_ACTION.removeToRecentWatchesStart({
        movie_id: id,
        user_profile_id: AUTH_PROFILE.id
    }));

    if (! recently_watched_movies.length) {
        return (
            <View style={ styles.emptyRecentWatchesContainer }>
                <Text h4 style={ styles.emptyRecentWatchesText }>Your recently watched movie's will be shown here.</Text>
            </View>
        )
    }

    return (
        <View style={ styles.container }>
            {
                AUTH.isLoading 
                    ? <TextLoader />
                    : <Text style={ styles.continueWatchingForHeader }>Continue Watching For <Text style={ styles.name }>{ name.toUpperCase() }</Text></Text>
            }

            <FlatList 
                keyExtractor={ (item, index) => index.toString() }
                data={ recently_watched_movies }
                horizontal
                renderItem={({ item }) =>  (
                    <ContinueWatchingForItem 
                        movie={ item } 
                        handleToggleLike={ () => handleToggleLike(item) }
                        handleToggleDisLike={ () => handleToggleDisLike(item) }
                        handlePressRemoveRate={ () => handlePressRemoveRate(item) }
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
