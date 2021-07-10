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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


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
    const { id: selectedShowID } = route.params;

    const videoRef = useRef(null);
    const [ currentSeasons, setCurrentSeasons ] = useState([]);
    const [ currentSeasonEpisodes, setCurrentSeasonEpisodes ] = useState([]);
    const [ currentSeasonEpisode, setCurrentSeasonEpisode ] = useState(DEFAULT_EPISODE);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ isLoadingAddToMyList, setIsLoadingAddToMyList ] = useState(false);
    const [ isLoadingLikedShows, setIsLoadingLikedShows ] = useState(false);
    const [ selectedSeason, setSelectedSeason ] = useState('');
    const [ show, setShow ] = useState(null);
    const [ shouldPlayVideo, setShouldPlayVideo ] = useState(false);
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

    const handlePressTabAddToLIst = () => 
    {
        setIsLoadingAddToMyList(true);
        dispatch(AUTH_ACTION.toggleAddToMyListStart({ id: show.id, title: show.title, poster: show.poster }));
        setTimeout(() => setIsLoadingAddToMyList(false), 1);
    }

    const handlePressTabLikeShow = () => 
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
        const findShowByID = showsAPI.find(({ id }) => id === selectedShowID);
        
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
        return <LoadingScreen />
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
                    uri: currentSeasonEpisode.video
                }}
                useNativeControls
                resizeMode='contain'
                onPlaybackStatusUpdate={status => {
                    console.log(status)
                    setVideoStatus(() => status)
                }}
            />

            <FlatList 
                data={ currentSeasonEpisodes }
                renderItem={ ({ item }) => (
                    <EpisodeItem episode={ item } onPress={ () => setCurrentSeasonEpisode(item) }/>
                )}
                ListHeaderComponent={(
                    <View style={ styles.movieContainer }>
                        {/* Movie Title */}
                        <View style={ styles.movieTitleContainer }>
                            <Text h3 style={ styles.title }>{ show.title }</Text>
                            <View style={ styles.movieTitleInfo }>
                                <Text style={ styles.match }>{ '98%' } Match </Text>
                                <Text style={ styles.year }>{ show.year }</Text>
                                <Badge status='warning' value='12+' textStyle={ styles.ageContainerText }/>
                                <Text style={ styles.seasons }>{ `${ show.total_number_of_seasons } Seasons` }</Text>
                                <MaterialCommunityIcon name='high-definition-box' color='#fff' size={ 30 }/>
                            </View>
                        </View>

                        {/* Play and Download Buttons */}
                        <View style={ styles.playDownloadBtnContainer }> 
                            <Button
                                icon={
                                    <MaterialCommunityIcon
                                        name={ shouldPlayVideo ? 'pause' : 'play' }
                                        size={ 24 }
                                        color='black'
                                    />
                                }
                                title={ shouldPlayVideo ? 'Pause' : 'Play' }
                                buttonStyle={ styles.playBtn }
                                titleStyle={ styles.playBtnTitle }
                                onPress={ () => videoStatus?.isPlaying ? handlePressPauseVideo() : handlePressPlayVideo() }
                            />
                            <Button 
                                icon={
                                    <FeatherIcon
                                        name='download'
                                        size={ 24 }
                                        color='white'
                                    />
                                }
                                title=' Download'
                                buttonStyle={ styles.downloadBtn }
                            />
                        </View>

                        {/* Movie Description */}
                        <View style={ styles.movieDescriptionContainer }>
                            <Text style={ styles.plot }>{ show.plot }</Text>
                            <View style={ styles.castCreatorContainer }>
                                <Text style={ styles.cast }>Cast: { show.cast }</Text>
                                <Text style={ styles.creator }>Creator: { show.creator }</Text>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <ActionButton
                            selectedShowID={ selectedShowID }
                            isLoadingAddToMyList={ isLoadingAddToMyList }
                            isLoadingLikedShows={ isLoadingLikedShows }
                            handlePressTabLikeShow={ handlePressTabLikeShow }
                            handlePressTabAddToLIst={ handlePressTabAddToLIst }
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
                ListHeaderComponentStyle={ styles.listHeaderComponent }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(MovieDetailsScreen)
