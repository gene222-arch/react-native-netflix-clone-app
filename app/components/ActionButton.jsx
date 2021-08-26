import React from 'react'
import View from './View';
import { Tab } from 'react-native-elements';
import styles from '../assets/stylesheets/movieDetail';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as AUTH_ACTION from '../redux/modules/auth/actions'
import * as TOAST_ACTION from '../redux/modules/toast/actions'
import { createStructuredSelector } from 'reselect';
import { authProfileSelector, authSelector } from '../redux/modules/auth/selectors';
import { batch, connect, useDispatch } from 'react-redux';
import ActivityIndicatorWrapper from './ActivityIndicatorWrapper';
import RemindMeIcon from './RemindMeIcon';


const ActionButton = ({ AUTH, AUTH_PROFILE, movie, modelType = 'Movie', hasLikedMovie = false }) => 
{
    const dispatch = useDispatch();

    const isReminded = Boolean(AUTH_PROFILE.reminded_coming_soon_movies.find(({ coming_soon_movie_id }) => coming_soon_movie_id === movie.id));

    const handlePressAddToMyList = () => 
    {
        const movieExistsInMyList = AUTH_PROFILE.my_lists.find(({ movie_id }) => movie_id === movie.id);

        const message = !movieExistsInMyList
            ? 'Added to My List'
            : 'Removed to My List';

        batch(() => {
            dispatch(AUTH_ACTION.toggleAddToMyListStart({ movie, user_profile_id: AUTH_PROFILE.id }));
            dispatch(TOAST_ACTION.createToastMessageStart({ message }));
        });
    }

    const handlePressToggleRemindMe = () => {
        dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart({ user_profile_id: AUTH_PROFILE.id, movieID: movie.id }));
    }

    const handlePressLike = () => 
    {
        const { other_movies, ...movieDetails } = movie;
        const rate = !hasLikedMovie ? 'like' : '';
        const message = !hasLikedMovie ? 'Liked' : 'Unrated';
        
        batch(() => {
            dispatch(AUTH_ACTION.rateShowStart({ movie: movieDetails, rate, user_profile_id: AUTH_PROFILE.id, model_type: modelType }));
            dispatch(TOAST_ACTION.createToastMessageStart({ message }));
        });
    }

    const handlePressTabShare = () => console.log('Shared');


    return (
        <View style={ styles.tabsContainer }>
            <Tab value={ 0 } indicatorStyle={ styles.tabIndicator } disableIndicator={ true }>
                
                {
                    modelType !== 'Movie'
                        ? (
                            <Tab.Item 
                                title='Remind Me' 
                                icon={ 
                                    <ActivityIndicatorWrapper 
                                        isLoading={ AUTH.isLoading }
                                        component={
                                            <RemindMeIcon isReminded={ isReminded } />
                                        }
                                    />
                                }
                                titleStyle={ styles.tabItemTitle  }
                                containerStyle={ styles.tabItemContainer }
                                onPressIn={ handlePressToggleRemindMe }
                            />
                        )
                        : (
                            <Tab.Item 
                                title='My List' 
                                icon={ 
                                    <ActivityIndicatorWrapper 
                                        isLoading={ AUTH.isLoading }
                                        component={
                                            <MaterialCommunityIcon 
                                                name={ AUTH_PROFILE.my_lists.find(({ movie_id }) => movie_id === movie.id) ? 'check' : 'plus' }
                                                size={ 30 }
                                                color='white'
                                            />
                                        }
                                    />
                                }
                                titleStyle={ styles.tabItemTitle  }
                                containerStyle={ styles.tabItemContainer }
                                onPressIn={ handlePressAddToMyList }
                            />
                        )
                }

                <Tab.Item 
                    title='Like' 
                    icon={ 
                        <ActivityIndicatorWrapper 
                            isLoading={ AUTH.isLoading }
                            component={ 
                                <FontAwesome5 
                                    name='thumbs-up'
                                    size={ 30 }
                                    color='white'
                                    solid={ hasLikedMovie }
                                />
                            }
                        />
                    }
                    titleStyle={ styles.tabItemTitle }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressLike }
                />

                <Tab.Item 
                    title='Share' 
                    icon={ 
                        <ActivityIndicatorWrapper 
                            isLoading={ AUTH.isLoading }
                            component={
                                <FeatherIcon 
                                    name='share-2'
                                    size={ 30 }
                                    color='white'
                                />
                            }
                        />
                    }
                    titleStyle={ styles.tabItemTitle }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressTabShare }
                />

            </Tab>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ActionButton)
