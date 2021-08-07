import React,{ useState, useEffect, useRef } from 'react'
import { createStructuredSelector } from 'reselect';
import { Picker } from '@react-native-picker/picker'
import { InteractionManager, FlatList } from 'react-native'
import { Divider } from 'react-native-elements'
import { connect, useDispatch } from 'react-redux';
import { Video } from 'expo-av'

/** API */
import showsAPI from './../../../../services/data/movies';

/** Actions */
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'

/** Selectors */
import { authSelector } from '../../../../redux/modules/auth/selectors';

/** RNE Components */
import { Button, Badge } from 'react-native-elements'

/** Components */
import View from '../../../../components/View';
import Text from '../../../../components/Text';
import EpisodeItem from '../../../../components/episode-item/EpisodeItem';
import VideoPlayer from './../../../../components/VideoPlayer';
import ActionButton from './ActionButton';
import LoadingScreen from './../../../../components/LoadingScreen';

/** Styles */
import styles from '../../../../assets/stylesheets/movieDetail';

/** Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import PlayDownloadButton from './PlayDownloadButton';
import MovieDescription from './MovieDescription';
import LoadingSpinner from './../../../../components/LoadingSpinner';

const DEFAULT_EPISODE = {
    id: '',
    title: '',
    poster: '',
    duration: '',
    plot: '',
    video: '',
};

const MovieDetailsScreen = ({ AUTH, route }) => 
{   
    const dispatch = useDispatch();
    const { id: movieID } = route.params;

    const videoRef = useRef(null);
    const [ currentSeasons, setCurrentSeasons ] = useState([]);
    const [ currentSeasonEpisodes, setCurrentSeasonEpisodes ] = useState([]);
    const [ currentSeasonEpisode, setCurrentSeasonEpisode ] = useState(DEFAULT_EPISODE);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ isLoadingAddToMyList, setIsLoadingAddToMyList ] = useState(false);
    const [ isLoadingLike, setIsLoadingLikedShows ] = useState(false);
    const [ selectedSeason, setSelectedSeason ] = useState('');
    const [ show, setShow ] = useState(null);
    const [ isPlaying, setShouldPlayVideo ] = useState(false);
    const [ videoStatus, setVideoStatus ] = useState({});

    
    const handlePressPauseVideo = () => {
        setShouldPlayVideo(false);
        videoRef.current.pauseAsync();
    }

    const handlePressPlayVideo = () => 
    {
        setShouldPlayVideo(true);
        videoRef.current.playAsync();
        setTimeout(() => dispatch(AUTH_ACTION.addToRecentWatchesStart(currentSeasonEpisode)), 100);
    }

    const handleChangeSeason = (name, index) => {
        setSelectedSeason(name);
        setCurrentSeasonEpisodes(show.seasons[index].episodes);
    }

    const handlePressAddToMyList = () => 
    {
        setIsLoadingAddToMyList(true);
        dispatch(AUTH_ACTION.toggleAddToMyListStart({ id: show.id, title: show.title, poster: show.poster }));
        setTimeout(() => setIsLoadingAddToMyList(false), 1);
    }

    const handlePressLike = () => 
    {
        const { seasons, ...showToLike } = show;

        setIsLoadingLikedShows(true);
        dispatch(AUTH_ACTION.rateShowStart({ show: showToLike, rate: 'like' }));
        setTimeout(() => setIsLoadingLikedShows(false), 1);
    }

    const handlePressTabShare = () => {
        console.log('Shared');
    }

    const runAfterInteractions = () => 
    {
        const findShowByID = showsAPI.find(({ id }) => id === movieID);
        
        const seasons = findShowByID.seasons.map(({ name }) => name);
        const firstSeason = findShowByID.seasons[0];
        const episodeList = firstSeason.episodes;
        const episode = episodeList[0];

        setShow(findShowByID);
        setCurrentSeasons(seasons);
        setCurrentSeasonEpisodes(episodeList);
        setCurrentSeasonEpisode(episode);
        setSelectedSeason(firstSeason.name);

        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setCurrentSeasonEpisode(DEFAULT_EPISODE);
        setCurrentSeasonEpisodes([]);
        setSelectedSeason('');
        setShow(null);
        setVideoStatus({});
        setIsLoadingAddToMyList(false);
        setIsLoadingLikedShows(false);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            cleanUp();
        }
    }, []);

    if (!isInteractionsComplete) {
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
                    uri: currentSeasonEpisode.video_path
                }}
                useNativeControls
                resizeMode='contain'
                onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
            />

            <FlatList 
                data={ currentSeasonEpisodes }
                ListHeaderComponentStyle={ styles.listHeaderComponent }
                renderItem={ ({ item }) => (
                    <EpisodeItem 
                        movie={ item } 
                        onPress={ () => setCurrentSeasonEpisode(item) }
                    />
                )}
                ListHeaderComponent={(
                    <View style={ styles.movieContainer }>
                        <Header movie={ show } />

                        <PlayDownloadButton 
                            isPlaying={ isPlaying }
                            videoStatus={ videoStatus }
                            handlePressPauseVideo={ handlePressPauseVideo }
                            handlePressPlayVideo={ handlePressPlayVideo }
                        />
                        
                        <MovieDescription movie={ show } />
                    
                        <ActionButton
                            movieID={ movieID }
                            isLoadingAddToMyList={ isLoadingAddToMyList }
                            isLoadingLike={ isLoadingLike }
                            handlePressLike={ handlePressLike }
                            handlePressAddToMyList={ handlePressAddToMyList }
                            handlePressTabShare={ handlePressTabShare }
                        />

                        <Divider style={ styles.divider } />

                        <View style={ styles.episodesAndMoreLikeThisContainer }>
                            <Text style={ styles.episodeHeader }>EPISODES</Text>
                            
                            <Picker
                                selectedValue={ selectedSeason }
                                onValueChange={ handleChangeSeason }
                                style={ styles.seasonPicker }
                            >
                            {currentSeasons.map((season, index) => (
                                <Picker.Item 
                                    key={ index } 
                                    label={ season } 
                                    value={ season } 
                                />
                            ))}
                            </Picker>
                        </View>

                    </View>
                )}
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(MovieDetailsScreen)
