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
import { connect, useDispatch } from 'react-redux';
import ActivityIndicatorWrapper from './ActivityIndicatorWrapper';


const ActionButton = ({ AUTH, AUTH_PROFILE, movie }) => 
{
    const dispatch = useDispatch();

    const handlePressAddToMyList = () => {
        dispatch(AUTH_ACTION.toggleAddToMyListStart(movie));
        
        const message = !AUTH_PROFILE.my_list.find(({ id }) => id === movie.id)
            ? 'Added to My List'
            : 'Removed to My List';

        dispatch(TOAST_ACTION.createToastMessageStart({ message }));
    }

    const handlePressLike = () => {
        const { other_movies, ...movieDetails } = movie;
        dispatch(AUTH_ACTION.rateShowStart({ show: movieDetails, rate: 'like' }));

        const message = !AUTH_PROFILE.liked_shows.find(({ id }) => id === movie.id)
            ? 'Liked'
            : 'Unrated';

        dispatch(TOAST_ACTION.createToastMessageStart({ message }));
    }

    const handlePressTabShare = () => console.log('Shared');


    return (
        <View style={ styles.tabsContainer }>
            <Tab value={ 0 } indicatorStyle={ styles.tabIndicator } disableIndicator={ true }>
                <Tab.Item 
                    title='My List' 
                    icon={ 
                        <ActivityIndicatorWrapper 
                            isLoading={ AUTH.isLoading }
                            component={
                                <MaterialCommunityIcon 
                                    name={ AUTH_PROFILE.my_list.find(movie_ => movie_.id === movie.id) ? 'check' : 'plus' }
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
                                    solid={ Boolean(AUTH_PROFILE.liked_shows.find(movie_ => movie_.id === movie.id)) }
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
