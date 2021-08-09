import React,{ useState, useEffect, useRef } from 'react'
import { InteractionManager, FlatList } from 'react-native'
import { useDispatch, connect } from 'react-redux';
import { Video } from 'expo-av'
import moviesAPI from './../../../../services/data/movies';
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'
import View from '../../../../components/View';
import EpisodeItem from '../../../../components/episode-item/EpisodeItem';
import styles from '../../../../assets/stylesheets/movieDetail';
import Header from './Header';
import PlayDownloadButton from './PlayDownloadButton';
import MovieDescription from './MovieDescription';
import LoadingSpinner from './../../../../components/LoadingSpinner';
import PaginationPicker from './PaginationPicker';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';
import ActionButton from './../../../../components/ActionButton';


const PER_PAGE = 3;

const MovieDetailsScreen = ({ AUTH_PROFILE, route }) => 
{   
    const dispatch = useDispatch();
    const { id: movieID } = route.params;

    const videoRef = useRef(null);
    const [ videoStatus, setVideoStatus ] = useState(null);
    const [ movie, setMovie ] = useState(null);
    const [ movies, setMovies ] = useState([]);
    const [ pages, setPages ] = useState([]);
    const [ selectedPage, setSelectedPage ] = useState('');
    const [ defaultPageList, setDefaultPageList ] = useState([]);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const handlePressPlayVideo = () => {
        videoRef.current.playAsync();
        dispatch(AUTH_ACTION.addToRecentWatchesStart(movie));
    }

    const handlePressPauseVideo = () => videoRef.current.pauseAsync();

    const handleChangePage = (pageNumber, index) => {
        setSelectedPage(pageNumber);
        setDefaultPageList(movies[index]);
    }

    const runAfterInteractions = () => 
    {
        const { other_movies, ...movieDetails } = moviesAPI.find(({ id }) => id === movieID);

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
        }
    }, []);

    if (! isInteractionsComplete) {
        return <LoadingSpinner />
    }

    return (
        <View style={ styles.container }>
            <Video 
                ref={ videoRef }
                style={{
                    width: '100%',
                    aspectRatio: 16/9
                }}
                source={{
                    uri: movie.video_path
                }}
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
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(MovieDetailsScreen)
