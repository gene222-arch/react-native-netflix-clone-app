import React,{ useState, useEffect, useRef } from 'react'
import { InteractionManager, FlatList } from 'react-native'
import { useDispatch, connect, batch } from 'react-redux';
import { Video } from 'expo-av'
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'
import * as MOVIE_ACTION from './../../../../redux/modules/movie/actions'
import View from '../../../../components/View';
import EpisodeItem from '../../../../components/episode-item/EpisodeItem';
import styles from '../../../../assets/stylesheets/movieDetail';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { movieSelector } from './../../../../redux/modules/movie/selectors';
import MovieDetailScreenLoader from '../../../../components/loading-skeletons/MovieDetailScreenLoader';
import ListHeader from './ListHeader';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

const PER_PAGE = 3;

const MovieDetailsScreen = ({ AUTH_PROFILE, route, MOVIE }) => 
{   
    const dispatch = useDispatch();
    const navigations = useNavigation();
    const { id: movieId } = route.params;

    const videoRef = useRef(null);
    const [ videoStatus, setVideoStatus ] = useState(null);
    const [ movie, setMovie ] = useState(null);
    const [ similarMovies, setSimilarMovies ] = useState([]);
    const [ pages, setPages ] = useState([]);
    const [ selectedPage, setSelectedPage ] = useState('');
    const [ pageIndex, setPageIndex ] = useState(0);
    const [ defaultPageList, setDefaultPageList ] = useState([]);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ isRecentlyWatched, setIsRecentlyWatched ] = useState(false);
    const [ lastPlayedPositionMillis, setLastPlayedPositionMillis ] = useState(0);
    const [ isFullscreen, setIsFullscreen ] = useState(true);

    const handlePressPlayVideo = () => 
    {
        onLoadLockToLandscape();

        videoRef.current?.presentFullscreenPlayer();

        setIsFullscreen(true);

        if (isRecentlyWatched) {
            videoRef.current?.setPositionAsync(lastPlayedPositionMillis);
        }

        videoRef.current.playAsync();
        
        batch(() => 
        {
            dispatch(AUTH_ACTION.addToRecentWatchesStart({ 
                movie, 
                user_profile_id: AUTH_PROFILE.id, 
                duration_in_millis: videoStatus.durationMillis,
                last_played_position_millis: videoStatus.positionMillis
            }));

            dispatch(MOVIE_ACTION.incrementMovieViewsStart({ movieId }))
        });
    }

    const handlePressPauseVideo = () => videoRef.current.pauseAsync();

    const handleChangePage = (pageNumber, index) => {
        setSelectedPage(pageNumber);
        setPageIndex(index);
        setDefaultPageList(similarMovies[index]);
    }

    const handleClickChangeMovie = (selectedMovie) => 
    {
        setMovie(selectedMovie);
        
        navigations.setParams({
            headerTitle: selectedMovie.title
        });

        const filteredMovies = similarMovies[pageIndex].filter(similarMovie => similarMovie.id !== selectedMovie.id);
        const newMovies = [ movie, ...filteredMovies ];
        let filterSimilarMovies = similarMovies.map((similarMovie, index) => index === pageIndex ? newMovies : similarMovie);

        setSimilarMovies(filterSimilarMovies);
        setDefaultPageList(newMovies);
    }

    const onUnloadUnlockLandscape = async () => {
        try {
            await ScreenOrientation.unlockAsync();
        } catch (error) {
            
        }
    }

    const onLoadLockToLandscape = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

    const handleFullscreenUpdate = e => 
    {
        if (e.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS) {
            setIsFullscreen(false);
            handlePressPauseVideo();
            dispatch(AUTH_ACTION.updateRecentlyWatchedAtPositionMillisStart({ 
                movieId, 
                positionMillis: videoStatus?.positionMillis, 
                user_profile_id: AUTH_PROFILE.id 
            }));
        }

        if (e.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT) {
            setIsFullscreen(true);
        }
    }

    const runAfterInteractions = () => 
    {
        const findMovie = MOVIE.movies.find(({ id }) => id === movieId);

        if (findMovie) 
        {
            const { similar_movies, ...movieDetails } = findMovie;    

            let pageList_ = [];
            let totalPages = [];
            const similarMovies_ = similar_movies.map(({ movie }) => movie);
            const totalNumberOfPages = Math.ceil(similarMovies_.length / PER_PAGE);
    
            for (let pageCount = 1; pageCount <= totalNumberOfPages; pageCount++) {
                totalPages.push(pageCount);
            }
    
            for (let index = 0; index < similarMovies_.length; index += PER_PAGE) {
                pageList_.push(
                    similarMovies_.slice(index, index + PER_PAGE)
                );
            }
    
            setMovie(movieDetails);
            setSimilarMovies(pageList_);
            setPages(totalPages);
            setSelectedPage(1);
            setDefaultPageList(pageList_[0]);
        }

        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => 
        {
            onUnloadUnlockLandscape();

            setMovie(null);
            setSimilarMovies([]);
            setPages([]);
            setDefaultPageList([]);
            setSelectedPage(1);
            setVideoStatus(null);
            setIsInteractionsComplete(false);
            setIsRecentlyWatched(false);
            setLastPlayedPositionMillis(0);
            videoRef.current = null;
        }
    }, []);

    useEffect(() => 
    {
        if (! isFullscreen) {
            onUnloadUnlockLandscape();
        }
    }, [isFullscreen]);

    useEffect(() => {
        const findMovieInRecents = AUTH_PROFILE.recently_watched_movies.find(({ id }) => id === movieId);

        if (! findMovieInRecents) {
            setIsRecentlyWatched(false);
        }

        if (findMovieInRecents) {
            setIsRecentlyWatched(true);
            setLastPlayedPositionMillis(findMovieInRecents.last_played_position_millis);
        }
    }, [AUTH_PROFILE.recently_watched_movies]);

    if (! isInteractionsComplete || !movie) return <MovieDetailScreenLoader />

    return (
        <View style={ styles.container }>
            <Video 
                ref={ videoRef }
                style={{
                    width: '100%',
                    aspectRatio: 16/9
                }}
                source={{ uri: movie.video_path }}
                usePoster={ !videoStatus?.isPlaying }
                posterSource={{ uri: movie.wallpaper_path }}
                posterStyle={{
                    width: '100%',
                    aspectRatio: 16/9
                }}
                useNativeControls
                resizeMode='contain'
                onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
                onFullscreenUpdate={ handleFullscreenUpdate }
            />

            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ defaultPageList }
                ListHeaderComponentStyle={ styles.listHeaderComponent }
                renderItem={ ({ item }) => <EpisodeItem movie={ item } onPress={ () => handleClickChangeMovie(item) } />}
                ListHeaderComponent={
                    <ListHeader 
                        movie={ movie }
                        videoStatus={ videoStatus }
                        handlePressPlayVideo={ handlePressPlayVideo }
                        handlePressPauseVideo={ handlePressPauseVideo }
                        pages={ pages }
                        isRecentlyWatched={ isRecentlyWatched }
                        selectedPage={ selectedPage }
                        handleChangePage={ handleChangePage }
                    />
                }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    MOVIE: movieSelector
});

export default connect(mapStateToProps)(MovieDetailsScreen)
