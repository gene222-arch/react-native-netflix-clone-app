import React,{ useState, useEffect, useRef } from 'react'
import { InteractionManager, FlatList } from 'react-native'
import { useDispatch, connect } from 'react-redux';
import { Video } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'
import View from '../../../../components/View';
import EpisodeItem from '../../../../components/episode-item/EpisodeItem';
import styles from '../../../../assets/stylesheets/movieDetail';
import Header from './Header';
import PlayDownloadButton from './PlayDownloadButton';
import MovieDescription from './MovieDescription';
import PaginationPicker from './PaginationPicker';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';
import ActionButton from './../../../../components/ActionButton';
import { movieSelector } from './../../../../redux/modules/movie/selectors';
import MovieDetailScreenLoader from '../../../../components/loading-skeletons/MovieDetailScreenLoader';
import { getExtension } from '../../../../utils/file';
import { ensureFileExists } from '../../../../utils/cacheImage';


const PER_PAGE = 3;

const MovieDetailsScreen = ({ AUTH_PROFILE, route, MOVIE }) => 
{   
    const dispatch = useDispatch();
    const { id: movieID } = route.params;

    const videoRef = useRef(null);
    const [ videoStatus, setVideoStatus ] = useState(null);
    const [ videoUri, setVideoUri ] = useState(null);
    const [ movie, setMovie ] = useState(null);
    const [ movies, setMovies ] = useState([]);
    const [ pages, setPages ] = useState([]);
    const [ selectedPage, setSelectedPage ] = useState('');
    const [ defaultPageList, setDefaultPageList ] = useState([]);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const handlePressPlayVideo = () => {
        videoRef.current.playAsync();
        dispatch(AUTH_ACTION.addToRecentWatchesStart({ movie, user_profile_id: AUTH_PROFILE.id }));
    }

    const handlePressPauseVideo = () => videoRef.current.pauseAsync();

    const onLoadCacheVideo = async (uri) => 
    {
        try {
            const fileExt = getExtension(uri);
            
            const fileToCacheURI = FileSystem.cacheDirectory + movieID + `.${ fileExt }`;
            const fileInfo = await ensureFileExists(fileToCacheURI);
    
            if (! fileInfo.exists) {
                await FileSystem.downloadAsync(uri, fileToCacheURI)
            }

            setVideoUri(fileToCacheURI);
        } catch ({ message }) {
            console.log(message);
        }

    }

    const handleChangePage = (pageNumber, index) => {
        setSelectedPage(pageNumber);
        setDefaultPageList(movies[index]);
    }

    const runAfterInteractions = () => 
    {
        const findMovie = MOVIE.movies.find(({ id }) => id === parseInt(movieID));

        if (findMovie) 
        {
            const { other_movies, ...movieDetails } = findMovie;
            onLoadCacheVideo(movieDetails.video_path);

            let pageList_ = [];
            let totalPages = [];
            const totalNumberOfPages = Math.ceil(other_movies.length / PER_PAGE);
    
            for (let pageCount = 1; pageCount <= totalNumberOfPages; pageCount++) {
                totalPages.push(pageCount);
            }
    
            for (let index = 0; index < other_movies.length; index += PER_PAGE) {
                pageList_.push(
                    other_movies.slice(index, index + PER_PAGE)
                );
            }
    
            setMovie(movieDetails);
            setMovies(pageList_);
            setPages(totalPages);
            setSelectedPage(1);
            setDefaultPageList(pageList_[0]);
        }

        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            setMovie(null);
            setMovies([]);
            setPages([]);
            setDefaultPageList([]);
            setSelectedPage(1);
            setVideoStatus(null);
            setIsInteractionsComplete(false);
            setVideoUri(null);
            videoRef.current = null;
        }
    }, []);

    if (! isInteractionsComplete) {
        return <MovieDetailScreenLoader />
    }

    return (
        <View style={ styles.container }>
            <Video 
                ref={ videoRef }
                style={{
                    width: '100%',
                    aspectRatio: 16/9
                }}
                source={{ uri: !videoUri ? movie.video_path : videoUri }}
                useNativeControls
                resizeMode='contain'
                onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
            />

            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ defaultPageList }
                ListHeaderComponentStyle={ styles.listHeaderComponent }
                renderItem={ ({ item }) => <EpisodeItem movie={ item } onPress={ () => setMovie(item) } />}
                ListHeaderComponent={(
                    <View style={ styles.movieContainer }>
                        <Header movie={ movie } />
                        <PlayDownloadButton
                            videoStatus={ videoStatus }
                            handlePressPauseVideo={ handlePressPauseVideo }
                            handlePressPlayVideo={ handlePressPlayVideo }
                        />
                        <MovieDescription movie={ movie } />
                        <ActionButton movie={ movie } />
                        <PaginationPicker 
                            pages={ pages }
                            selectedPage={ selectedPage } 
                            handleChangePage={ handleChangePage }
                        />
                    </View>
                )}
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    MOVIE: movieSelector
});

export default connect(mapStateToProps)(MovieDetailsScreen)
