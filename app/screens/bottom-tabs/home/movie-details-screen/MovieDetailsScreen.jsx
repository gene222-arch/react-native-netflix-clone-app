import React,{ useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { Picker } from '@react-native-picker/picker'
import { FlatList } from 'react-native-gesture-handler';
import { InteractionManager, ActivityIndicator } from 'react-native'
import { connect, useDispatch } from 'react-redux';

/** Actions */
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'

/** Selectors */
import { movieSelector } from './../../../../redux/modules/movie/selectors'
import { likedShowsSelector, myListSelector, authSelector } from './../../../../redux/modules/auth/selectors';

/** RNE Components */
import { Button, Badge, Tab } from 'react-native-elements'

/** Components */
import View from '../../../../components/View';
import Text from '../../../../components/Text';
import EpisodeItem from '../../../../components/episode-item/EpisodeItem';

/** Styles */
import styles from '../../../../assets/stylesheets/movieDetail';

/** Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import showsAPI from './../../../../services/data/movies';
import VideoPlayer from './../../../../components/VideoPlayer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DEFAULT_EPISODE = {
    id: '',
    title: '',
    poster: '',
    duration: '',
    plot: '',
    video: '',
};

const ACTION_TYPES = {
    ADD_TO_MY_LIST: 'ADD TO MY LIST',
    ADD_TO_LIKED_SHOWS: 'ADD TO LIKED SHOWS',
    SHARE_SHOW: 'SHARE SHOW'
}

const TabIcon = ({ actionName, data, movieID, isLoading }) => 
{
    switch (actionName) 
    {
        case ACTION_TYPES.ADD_TO_MY_LIST:

            if (isLoading) {
                return <ActivityIndicator color='#fff' />
            } 
        
            return (
                <MaterialCommunityIcon 
                    name={ !data.find(({ id }) => id === movieID) ? 'plus' : 'check' }
                    size={ 24 }
                    color="white"
                />
            )

        case ACTION_TYPES.ADD_TO_LIKED_SHOWS:

            if (isLoading) {
                return <ActivityIndicator color='#fff' />
            } 

            return (
                <FontAwesome5 
                    name="thumbs-up"
                    size={ 24 }
                    color="white"
                    solid={ Boolean(data.find(({ id }) => id === movieID)) }
                />
            )

        case ACTION_TYPES.SHARE_SHOW:

            if (isLoading) {
                return <ActivityIndicator color='#fff' />
            } 

            return (
                <FeatherIcon 
                    name="share-2"
                    size={ 24 }
                    color="white"
                />
            )
    }
}

const MovieDetailsScreen = ({ route, AUTH, LIKED_SHOWS, MY_LIST }) => 
{   
    const dispatch = useDispatch();
    const { id: selectedShowID } = route.params;
    const show = showsAPI.find(({ id }) => id === selectedShowID);

    const [ currentSeasons, setCurrentSeasons ] = useState([]);
    const [ currentSeasonEpisode, setCurrentSeasonEpisode ] = useState(DEFAULT_EPISODE);
    const [ currentSeasonEpisodes, setCurrentSeasonEpisodes ] = useState([]);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ toggleVideo, setToggleVideo ] = useState(false);
    const [ selectedSeason, setSelectedSeason ] = useState('');
    const [ selectedTab, setSelectedTab ] = useState(0);

    const [ isLoadingAddToMyList, setIsLoadingAddToMyList ] = useState(false);
    const [ isLoadingLikedShows, setIsLoadingLikedShows ] = useState(false);

    const handlePressToggleVideo = () => setToggleVideo(!toggleVideo);

    const handlePressEpisode = (episode) => setCurrentSeasonEpisode(episode);

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

        dispatch(AUTH_ACTION.toggleLikeShowStart(showToLike));
        setTimeout(() => setIsLoadingLikedShows(false), 1);
    }

    const handlePressTabShare = () => {
        setSelectedTab(2);
        console.log('Shared');
    }

    const runAfterInteractions = () => 
    {
        const seasons = show.seasons.items.map(({ name }) => name);
        const firstSeason = show.seasons.items[0];
        const episodeList = firstSeason.episodes.items;
        const episode = firstSeason.episodes.items[0];

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
        return <Text h4>Loading ...</Text>
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.videoPlayerContainer }>
                <VideoPlayer 
                    episode={ currentSeasonEpisode } 
                    shouldPlay={ toggleVideo } 
                    handlePressToggleVideo={ handlePressToggleVideo }
                />
            </View>
            <FlatList 
                data={ currentSeasonEpisodes }
                renderItem={ ({ item }) => (
                    <EpisodeItem episode={ item } onPress={ () => handlePressEpisode(item) }/>
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
                                        color="black"
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
                                        name="download"
                                        size={ 24 }
                                        color="white"
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

                        {/* Tabs */}
                        <View style={ styles.tabsContainer }>
                            <Tab value={ selectedTab } indicatorStyle={ styles.tabIndicator }>
                                <Tab.Item 
                                    title="My List" 
                                    icon={
                                        isLoadingAddToMyList 
                                            ? <ActivityIndicator color='#fff' />
                                            : (
                                                <TabIcon 
                                                    actionName={ ACTION_TYPES.ADD_TO_MY_LIST } 
                                                    data={ MY_LIST } 
                                                    movieID={ selectedShowID }
                                                />
                                            )
                                    }
                                    titleStyle={ styles.tabItemTitle  }
                                    containerStyle={ styles.tabItemContainer }
                                    onPressIn={ handlePressTabAddToLIst }
                                />
                                <Tab.Item 
                                    title="Like" 
                                    icon={ 
                                        isLoadingLikedShows 
                                            ? <ActivityIndicator color='#fff' />
                                            : (
                                                <TabIcon 
                                                    actionName={ ACTION_TYPES.ADD_TO_LIKED_SHOWS } 
                                                    data={ LIKED_SHOWS } 
                                                    movieID={ selectedShowID }
                                                /> 
                                            )
                                    }
                                    titleStyle={ styles.tabItemTitle }
                                    containerStyle={ styles.tabItemContainer }
                                    onPressIn={ handlePressTabLikeShow }
                                />
                                <Tab.Item 
                                    title="Share" 
                                    icon={ 
                                        <TabIcon 
                                            actionName={ ACTION_TYPES.SHARE_SHOW }
                                            movieID={ selectedShowID }
                                        /> 
                                    }
                                    titleStyle={ styles.tabItemTitle }
                                    containerStyle={ styles.tabItemContainer }
                                    onPressIn={ handlePressTabShare }
                                />
                            </Tab>
                        </View>
                                    
                        <Picker
                            selectedValue={ selectedSeason }
                            onValueChange={ handleChangeSeason }
                            style={ styles.seasonPicker }
                            dropdownIconColor='white'
                        >
                        {
                            currentSeasons.map((season, index) => <Picker.Item key={ index } label={ season } value={ season } />)
                        }
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
    Movie: movieSelector,
    AUTH: authSelector,
    LIKED_SHOWS: likedShowsSelector,
    MY_LIST: myListSelector
})

export default connect(mapStateToProps)(MovieDetailsScreen)
