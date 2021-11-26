import React, { useState, useEffect } from 'react'
import { InteractionManager, ActivityIndicator, ToastAndroid } from 'react-native'
import View from './View';
import { StyleSheet } from 'react-native'
import * as AUTH_ACTION from '../redux/modules/auth/actions'
import { createStructuredSelector } from 'reselect';
import { authProfileSelector, authSelector } from '../redux/modules/auth/selectors';
import { connect, useDispatch } from 'react-redux';
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
        width: '70%',
        marginLeft: 30,
        marginTop: 10
    }
});


const ActionButton = ({ AUTH, AUTH_PROFILE, movie, modelType = 'Movie' }) => 
{
    const dispatch = useDispatch();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ isMovieLiked, setIsMovieLiked ] = useState(false);
    const [ isMovieAddedToList, setIsMovieAddedToList ] = useState(false);
    const [ isSharing, setIsSharing ] = useState(false);
    const [ isMovieReminded, setIsMovieReminded ] = useState(false);

    const handlePressAddToMyList = () => 
    {
        if (! AUTH.isLoading) 
        {
            setTimeout(() => {
                dispatch(AUTH_ACTION.toggleAddToMyListStart({ movie, user_profile_id: AUTH_PROFILE.id }));
            }, 10);
            setIsMovieAddedToList(!isMovieAddedToList);
            const message = !isMovieAddedToList ? 'Added to My List' : 'Removed to My List';
            ToastAndroid.show( message, ToastAndroid.SHORT);
        }
    }

    const handlePressToggleRemindMe = () => 
    {
        const message = !isMovieReminded ? 'Reminded' : '';
        setIsMovieReminded(! isMovieReminded);
        ToastAndroid.show( message, ToastAndroid.SHORT);
        setTimeout(() => {
            dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart({ user_profile_id: AUTH_PROFILE.id, movieID: movie.id }));
        }, 10);
    }

    const handlePressLike = () => 
    {
        if (! AUTH.isLoading) {
            const { other_movies, ...movieDetails } = movie;
            const message = !isMovieLiked ? 'Liked' : 'Unrated';
            setTimeout(() => {
                dispatch(AUTH_ACTION.rateShowStart({ 
                    movie: movieDetails, 
                    rate: !isMovieLiked ? 'like' : '', 
                    user_profile_id: AUTH_PROFILE.id, 
                    model_type: modelType 
                }));
            }, 10);
            setIsMovieLiked(!isMovieLiked);
            ToastAndroid.show( message, ToastAndroid.SHORT);
        }
    }

    const handlePressTabShare = async () => 
    {
        setIsSharing(true);
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
        setIsSharing(false);
    }

    useEffect(() => 
    {``
        InteractionManager.runAfterInteractions(() => 
        {
            const isLiked = (
                modelType === 'Movie' 
                    ? AUTH_PROFILE.liked_movies.find(({ movie_id }) => movie_id === movie.id)
                    : AUTH_PROFILE.liked_coming_soon_movies.find(({ movie_id }) => movie_id === movie.id)
            );

            const isAddedToList = AUTH_PROFILE.my_lists.find(({ movie_id }) => movie_id === movie.id);

            const isReminded = AUTH_PROFILE
                .reminded_coming_soon_movies
                .find(({ coming_soon_movie_id }) => coming_soon_movie_id === movie.id);

            setIsMovieReminded(Boolean(isReminded));
            setIsMovieAddedToList(Boolean(isAddedToList));
            setIsMovieLiked(Boolean(isLiked));
            setIsInteractionsComplete(true);
        });

        return () => {
            setIsInteractionsComplete(false);   
            setIsMovieLiked(false);
            setIsMovieAddedToList(false);
            setIsMovieReminded(false);
            setIsSharing(false);
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
                            name={ !isMovieReminded ? 'bell' : 'check' }
                            size={ 30 }
                            onPress={ handlePressToggleRemindMe }
                        />
                    )
                    : (
                        <MaterialButton 
                            label='My List'
                            name={ isMovieAddedToList ? 'check' : 'plus' }
                            size={ 30 }
                            onPress={ handlePressAddToMyList }
                        />
                    )
            }

            <FontAwesomeButton 
                label='Like'
                name={ 'thumbs-up' }
                size={ 30 }
                onPress={ handlePressLike }
                isSolid={ isMovieLiked }
            />

            <FeatherButton 
                label={ `${ isSharing ? 'Sharing...' : 'Share' }` }
                name={ 'share-2' }
                size={ 30 }
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
