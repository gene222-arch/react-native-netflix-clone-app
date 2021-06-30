import React,{ useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { Picker } from '@react-native-picker/picker'
import { FlatList } from 'react-native-gesture-handler';
import { InteractionManager } from 'react-native'
import { connect, useDispatch } from 'react-redux';

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

    const [ currentSeasons, setCurrentSeasons ] = useState([]);
    const [ currentSeasonEpisodes, setCurrentSeasonEpisodes ] = useState([]);
    const [ currentSeasonEpisode, setCurrentSeasonEpisode ] = useState(DEFAULT_EPISODE);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ isLoadingAddToMyList, setIsLoadingAddToMyList ] = useState(false);
    const [ isLoadingLikedShows, setIsLoadingLikedShows ] = useState(false);
    const [ selectedSeason, setSelectedSeason ] = useState('');
    const [ selectedTab, setSelectedTab ] = useState(0);
    const [ show, setShow ] = useState(null);
    const [ toggleVideo, setToggleVideo ] = useState(false);

    const handlePressToggleVideo = () => {
        setToggleVideo(!toggleVideo);

        // is playing
        if (toggleVideo) { 
            console.log('ADDED TO RECENT WATCHES');
            dispatch(AUTH_ACTION.addToRecentWatchesStart(currentSeasonEpisode));
        }
    }

    const handleChangeSeason = (name, index) => {
        setSelectedSeason(name);
        setCurrentSeasonEpisodes(show.seasons.items[index].episodes.items);
    }

    const handlePressTabAddToLIst = () => 
    {
        setIsLoadingAddToMyList(true);
        setSelectedTab(0);
        
        dispatch(AUTH_ACTION.toggleAddToMyListStart({ id: show.id, title: show.title, poster: show.poster }));
        setTimeout(() => setIsLoadingAddToMyList(false), 1);
    }

    const handlePressTabLikeShow = () => 
    {
        const { seasons, ...showToLike } = show;

        setIsLoadingLikedShows(true);
        setSelectedTab(1);

        dispatch(AUTH_ACTION.rateShowStart({ show: showToLike, rate: 'like' }));
        setTimeout(() => setIsLoadingLikedShows(false), 1);
    }

    const handlePressTabShare = () => {
        setSelectedTab(2);
        console.log('Shared');
    }

    const runAfterInteractions = () => 
    {
        const findShowByID = showsAPI.find(({ id }) => id === selectedShowID);
        
        const seasons = findShowByID.seasons.items.map(({ name }) => name);
        const firstSeason = findShowByID.seasons.items[0];
        const episodeList = firstSeason.episodes.items;
        const episode = firstSeason.episodes.items[0];

        setShow(findShowByID);
        setCurrentSeasons(seasons);
        setCurrentSeasonEpisodes(episodeList);
        setCurrentSeasonEpisode(episode);
        setSelectedSeason(firstSeason.name);

        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setToggleVideo(false);
        setCurrentSeasonEpisode(DEFAULT_EPISODE);
        setCurrentSeasonEpisodes([]);
        setSelectedSeason('');
        setSelectedTab(0);
        setShow(null);
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
            <View style={ styles.videoPlayerContainer }>
                <VideoPlayer 
                    episode={ currentSeasonEpisode } 
                    shouldPlay={ toggleVideo } 
                    setToggleVideo={ setToggleVideo }
                />
            </View>

            <FlatList 
                data={ currentSeasonEpisodes }
                renderItem={ ({ item }) => (
                    <EpisodeItem episode={ item } onPress={ () => setCurrentSeasonEpisode(item) }/>
                )}
                ListHeaderComponent={(
                    <View>
                        {/* Movie Title */}
                        <View style={ styles.movieTitleContainer }>
                            <Text h3 style={ styles.title }>{ show.title }</Text>
                            <View style={ styles.movieTitleInfo }>
                                <Text style={ styles.match }>{ '98%' }</Text>
                                <Text style={ styles.year }>{ show.year }</Text>
                                <Badge status='warning' value='12+' textStyle={ styles.ageContainerText }/>
                                <Text style={ styles.seasons }>{ '9 Seasons' }</Text>
                                <MaterialCommunityIcon name='high-definition-box' color='#fff' size={ 30 }/>
                            </View>
                        </View>

                        {/* Play and Download Buttons */}
                        <View style={ styles.playDownloadBtnContainer }> 
                            <Button
                                icon={
                                    <MaterialCommunityIcon
                                        name={ toggleVideo ? 'pause' : 'play' }
                                        size={ 24 }
                                        color='black'
                                    />
                                }
                                title={ toggleVideo ? 'Pause' : 'Play' }
                                buttonStyle={ styles.playBtn }
                                titleStyle={ styles.playBtnTitle }
                                onPress={ handlePressToggleVideo }
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
                            selectedTab={ selectedTab }
                            selectedShowID={ selectedShowID }
                            isLoadingAddToMyList={ isLoadingAddToMyList }
                            isLoadingLikedShows={ isLoadingLikedShows }
                            handlePressTabLikeShow={ handlePressTabLikeShow }
                            handlePressTabAddToLIst={ handlePressTabAddToLIst }
                            handlePressTabShare={ handlePressTabShare }
                        />

                        <Picker
                            selectedValue={ selectedSeason }
                            onValueChange={ handleChangeSeason }
                            style={ styles.seasonPicker }
                            dropdownIconColor='white'
                        >
                        {currentSeasons.map((season, index) => (
                            <Picker.Item 
                                key={ index } 
                                label={ season } 
                                value={ season } 
                            />
                        ))}
                        </Picker>
                        <Text style={ styles.episodeHeader } h4>Episodes</Text>
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
