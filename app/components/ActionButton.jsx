import React, { useState, useEffect } from 'react'
import { InteractionManager, ActivityIndicator } from 'react-native'
import View from './View';
import { StyleSheet } from 'react-native'
import * as AUTH_ACTION from '../redux/modules/auth/actions'
import * as TOAST_ACTION from '../redux/modules/toast/actions'
import { createStructuredSelector } from 'reselect';
import { authProfileSelector, authSelector } from '../redux/modules/auth/selectors';
import { batch, connect, useDispatch } from 'react-redux';
import MaterialButton from './styled-components/MaterialButton';
import FeatherButton from './styled-components/FeatherButton';
import FontAwesomeButton from './styled-components/FontAwesomeButton';
import Colors from './../constants/Colors';
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginLeft: 30,
        marginTop: 10
    }
});


const ActionButton = ({ AUTH, AUTH_PROFILE, movie, modelType = 'Movie' }) => 
{
    const dispatch = useDispatch();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ isMovieLiked, setIsMovieLiked ] = useState(false);
    const isReminded = Boolean(AUTH_PROFILE.reminded_coming_soon_movies.find(({ coming_soon_movie_id }) => coming_soon_movie_id === movie.id));

    const handlePressAddToMyList = () => 
    {
        const movieExistsInMyList = AUTH_PROFILE.my_lists.find(({ movie_id }) => movie_id === movie.id);

        const message = !movieExistsInMyList ? 'Added to My List' : 'Removed to My List';

        batch(() => {
            dispatch(AUTH_ACTION.toggleAddToMyListStart({ movie, user_profile_id: AUTH_PROFILE.id }));
            !isReminded && dispatch(TOAST_ACTION.createToastMessageStart({ message }));
        });
    }

    const handlePressToggleRemindMe = () => {
        batch(() => {
            dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart({ user_profile_id: AUTH_PROFILE.id, movieID: movie.id }));
            dispatch(TOAST_ACTION.createToastMessageStart({ message: 'Reminded' }));
        });
    }

    const handlePressLike = () => 
    {
        const { other_movies, ...movieDetails } = movie;
        const rate = !isMovieLiked ? 'like' : '';
        const message = !isMovieLiked ? 'Liked' : 'Unrated';
        
        batch(() => {
            dispatch(AUTH_ACTION.rateShowStart({ movie: movieDetails, rate, user_profile_id: AUTH_PROFILE.id, model_type: modelType }));
            dispatch(TOAST_ACTION.createToastMessageStart({ message }));
        });
    }

    const handlePressTabShare = async () => 
    {
        try {
            const downloadPath = FileSystem.documentDirectory + `${ modelType }${ movie.id }.jpg`;

            const { exists } = await FileSystem.getInfoAsync(downloadPath);
            let localUri = null;

            if (! exists) {
                const { uri } = await FileSystem.downloadAsync(movie.wallpaper_path, downloadPath);
                localUri = uri;
            }

            if (exists) {
                localUri = downloadPath;
            }

            if (! (await Sharing.isAvailableAsync())) {
                alert('Sharing is not available');
                return;
            }

            await Sharing.shareAsync(localUri, {
                mimeType: 'image/jpeg',
                dialogTitle: movie.title,
                UTI: 'image/jpeg'
            });
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => 
    {``
        InteractionManager.runAfterInteractions(() => 
        {
            const isLiked = (
                modelType === 'Movie' 
                    ? Boolean(AUTH_PROFILE.liked_movies.find(({ movie_id }) => movie_id === movie.id))
                    : Boolean(AUTH_PROFILE.liked_coming_soon_movies.find(({ movie_id }) => movie_id === movie.id))
            );

            setIsMovieLiked(isLiked);
            setIsInteractionsComplete(true);
        });

        return () => {
            setIsInteractionsComplete(false);   
            setIsMovieLiked(false);
        }
    }, [
        AUTH_PROFILE.liked_movies, 
        AUTH_PROFILE.liked_coming_soon_movies, 
        AUTH_PROFILE.reminded_coming_soon_movies,
        AUTH_PROFILE.my_lists,
        movie
    ]);

    
    if (! isInteractionsComplete) {
        return (
            <View style={ styles.container }>
                <ActivityIndicator color={ Colors.white } />
                <ActivityIndicator color={ Colors.white } />
                <ActivityIndicator color={ Colors.white } />
            </View>
        )
    }

    return (
        <View style={ styles.container }>
            {
                modelType !== 'Movie'
                    ? (
                        <MaterialButton 
                            label='Remind Me'
                            name={ !isReminded ? 'bell' : 'check' }
                            size={ 30 }
                            isLoading={ AUTH.isLoading }
                            onPress={ handlePressToggleRemindMe }
                        />
                    )
                    : (
                        <MaterialButton 
                            label='My List'
                            name={ AUTH_PROFILE.my_lists.find(({ movie_id }) => movie_id === movie.id) ? 'check' : 'plus' }
                            size={ 30 }
                            isLoading={ AUTH.isLoading }
                            onPress={ handlePressAddToMyList }
                        />
                    )
            }

            <FontAwesomeButton 
                label='Like'
                name={ 'thumbs-up' }
                size={ 30 }
                isLoading={ AUTH.isLoading }
                onPress={ handlePressLike }
                isSolid={ isMovieLiked }
            />

            <FeatherButton 
                label='Share'
                name={ 'share-2' }
                size={ 30 }
                isLoading={ AUTH.isLoading }
                onPress={ handlePressTabShare }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ActionButton)
