import React, { useState, useEffect, useMemo } from 'react'
import { TouchableOpacity, ToastAndroid } from 'react-native'
import { Button } from 'react-native-elements'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import styles from './../../../../assets/stylesheets/homeScreen';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect, useDispatch, batch } from 'react-redux';
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions';
import * as MOVIE_ACTION from './../../../../redux/modules/movie/actions'
import Info from './../../../../components/continue-watching-for-item/Info';
import { useNavigation } from '@react-navigation/native';


const Genre = ({ genres }) => 
{
    return (
        genres.map((genre, index) => (
            <Text key={ index } style={ styles.tagItem }>
                { genre }
            </Text>
        ))
    )
}

const FrontPageOptions = ({ AUTH_PROFILE, frontPage }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ showMovieInfo, setShowMovieInfo ] = useState(false);
    const [ isMovieAddedToMyList, setIsMovieAddedToMyList ] = useState(false);

    const genres = useMemo(() => frontPage?.genres.split(','), [ frontPage?.genres ]);

    const handlePressNavigateToDisplayVideo = () => 
    {
        const recentWatch = AUTH_PROFILE.recently_watched_movies.find(({ id }) => id === frontPage.id);
        const lastPlayedPositionMillis = !recentWatch ? 0 : recentWatch.last_played_position_millis;
        const durationInMillis = !recentWatch ? (frontPage.duration_in_minutes * 60000): recentWatch.duration_in_millis;

        setTimeout(() => {
            batch(() => {
                dispatch(AUTH_ACTION.addToRecentWatchesStart({ 
                    movie: frontPage, 
                    user_profile_id: AUTH_PROFILE.id, 
                    duration_in_millis: durationInMillis,
                    last_played_position_millis: lastPlayedPositionMillis
                }));
    
                dispatch(MOVIE_ACTION.incrementMovieViewsStart({ movieId: frontPage.id }));
            });
        }, 100);

        navigation.navigate('DisplayVideoRoot', {
            screen: 'DisplayVideoScreen',
            params: {
                videoUri: frontPage.video_path, 
                id: frontPage.id,
                title: frontPage.title,
                lastPlayedPositionMillis: !recentWatch ? (frontPage.last_played_position_millis || 0) : recentWatch.last_played_position_millis
            }
        });
    }

    const handleToggleAddToMyList = () => 
    {
        setIsMovieAddedToMyList(! isMovieAddedToMyList);

        const message = isMovieAddedToMyList ? 'Removed from My List' : 'Added to My List';
        ToastAndroid.show(message, ToastAndroid.SHORT);

        setTimeout(() => {
            dispatch(AUTH_ACTION.toggleAddToMyListStart({ movie: frontPage, user_profile_id: AUTH_PROFILE.id }));
        }, 0);
    }

    const onLoadSetIsMovieAddedToMyList = () => {
        const isAddedToList = AUTH_PROFILE.my_lists.find(({ movie_id }) => movie_id === frontPage?.id);
        setIsMovieAddedToMyList(isAddedToList);
    }

    useEffect(() => 
    {
        onLoadSetIsMovieAddedToMyList();

        return () => {
            setShowMovieInfo(false);
        }
    }, [AUTH_PROFILE.my_lists]);

    return (
        <View style={ styles.frontPageOptions }>
            <Info 
                selectedShow={ frontPage } 
                isVisible={ showMovieInfo } 
                setIsVisible={ setShowMovieInfo } 
            />

            <View style={ styles.tagsContainer }>
                { genres && <Genre genres={ genres } /> }
            </View>

            <View style={ styles.actionBtnsContainer }>
                <TouchableOpacity onPress={ handleToggleAddToMyList }>
                    <View style={ styles.myListInfoActionContainer }>
                        <FeatherIcon 
                            name={ isMovieAddedToMyList ? 'check' : 'plus' }
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
