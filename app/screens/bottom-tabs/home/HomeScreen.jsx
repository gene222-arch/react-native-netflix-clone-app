import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList, Platform, StatusBar } from 'react-native';
import { ImageBackground, InteractionManager } from 'react-native'
import View from './../../../components/View';
import HomeCategory from '../../../components/home-category/HomeCategory';
import styles from './../../../assets/stylesheets/homeScreen';
import NavBar from './home-components/NavBar';
import FrontPageOptions from './home-components/FrontPageOptions';
import ContinueWatchingFor from './home-components/ContinueWatchingFor';
import { useDispatch, connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { movieSelector } from './../../../redux/modules/movie/selectors';
import * as MOVIE_ACTION from './../../../redux/modules/movie/actions';
import HomeFrontPageLoader from './../../../components/loading-skeletons/HomeFrontPageLoader';
import AppBar from './../../AppBar';
import * as MovieCreatedEvent from './../../../events/movie.created.event'
import { authProfileSelector } from './../../../redux/modules/auth/selectors';
import { DEVICE_WIDTH } from '../../../constants/Dimensions';

const HomeScreen = ({ AUTH_PROFILE, MOVIE }) => 
{
    const dispatch = useDispatch();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(null);

    useEffect(() => {
        batch(() => {
            dispatch(MOVIE_ACTION.getCategorizedMoviesStart({ is_for_kids: AUTH_PROFILE.is_for_kids }));
            dispatch(MOVIE_ACTION.getMoviesStart({ is_for_kids: AUTH_PROFILE.is_for_kids }));
        });
    }, [AUTH_PROFILE]);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setFrontPage(MOVIE.movies[Math.floor(Math.random() * (MOVIE.movies.length))]);
            MovieCreatedEvent.listen(response => {
                dispatch(MOVIE_ACTION.createMovie({ movie: response.data }));
            });
    
            setIsInteractionsComplete(true);
        });

        return () => {
            MovieCreatedEvent.unListen();
            setIsInteractionsComplete(false);
        }   
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setFrontPage(null);
            }
        }, [])
    )


    if (! isInteractionsComplete) {
        return <HomeFrontPageLoader />
    }

    return (
        <View style={ styles.container }>
            <FlatList
                keyExtractor={ (item, index) => index.toString() }
                data={ MOVIE.categories }
                renderItem={({ item }) => (
                    <HomeCategory
                        title={ item.title }
                        categorizedMovies={ item.movies } 
                    />  
                )}
                ListHeaderComponent={
                    <View>
                        <ImageBackground 
                            source={{ 
                                uri: frontPage?.poster_path
                            }}
                            style={ styles.homeFrontPage }
                        >
                            <View style={ styles.appBarContainer }>
                                <AppBar marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } />
                                <NavBar />
                            </View>
                            <FrontPageOptions frontPage={ frontPage } />
                        </ImageBackground>  
                        <ContinueWatchingFor />
                    </View>          
                }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    MOVIE: movieSelector
});

export default connect(mapStateToProps)(HomeScreen)
