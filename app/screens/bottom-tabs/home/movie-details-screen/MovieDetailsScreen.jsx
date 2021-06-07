import React,{ useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { Picker } from '@react-native-picker/picker'
import { FlatList } from 'react-native-gesture-handler';

/** API */

import { movieSelector } from './../../../../redux/modules/movie/selectors'

/** RNE Components */
import { Button, Badge, Tab } from 'react-native-elements'

/** Components */
import View from '../../../../components/View';
import Text from '../../../../components/Text';
import Image from './../../../../components/Image';
import EpisodeItem from '../../../../components/episode-item/EpisodeItem';

/** Styles */
import styles from '../../../../assets/stylesheets/movieDetail';

/** Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import movieAPI from './../../../../services/data/movies';
import VideoPlayer from './../../../../components/VideoPlayer';


const MovieDetailsScreen = ({ Movie, route }) => 
{   
    const movie = movieAPI.find(({ id }) => id === route.params.id);

    const seasons = movie.seasons.items.map(({ name }) => name);
    const DEFAULT_SEASON = movie.seasons.items[0];
    const DEFAULT_EPISODES = DEFAULT_SEASON.episodes.items;
    const DEFAULT_EPISODE = DEFAULT_SEASON.episodes.items[0];

    const [ toggleVideo, setToggleVideo ] = useState(false);
    const [ currentEpisode, setCurrentEpisode ] = useState(DEFAULT_EPISODE);
    const [ currentSeason, setCurrentSeason ] = useState(DEFAULT_EPISODES);
    const [ selectedSeason, setSelectedSeason ] = useState(DEFAULT_SEASON.name);
    const [ selectedTab, setSelectedTab ] = useState(0);

    const handlePressToggleVideo = () => setToggleVideo(!toggleVideo);

    const handlePressEpisode = (episode) => setCurrentEpisode(episode);

    const handleChangeSeason = (name, index) => {
        setSelectedSeason(name);
        setCurrentSeason(movie.seasons.items[index].episodes.items);
    }
    
    const handlePressTabs = (index) => setSelectedTab(index);

    
    return (
        <View style={ styles.container }>
            <View style={ styles.videoPlayerContainer }>
                <VideoPlayer 
                    episode={ currentEpisode } 
                    shouldPlay={ toggleVideo } 
                    handlePressToggleVideo={ handlePressToggleVideo }
                />
            </View>
            <FlatList 
                data={ currentSeason }
                renderItem={ ({ item }) => (
                    <EpisodeItem episode={ item } onPress={ () => handlePressEpisode(item) }/>
                )}
                ListHeaderComponent={(
                    <View>
                        {/* Movie Title */}
                        <View style={ styles.movieTitleContainer }>
                            <Text h3 style={ styles.title }>{ movie.title }</Text>
                            <View style={ styles.movieTitleInfo }>
                                <Text style={ styles.match }>{ '98%' }</Text>
                                <Text style={ styles.year }>{ movie.year }</Text>
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
                            <Text style={ styles.plot }>{ movie.plot }</Text>
                            <View style={ styles.castCreatorContainer }>
                                <Text style={ styles.cast }>Cast: { movie.cast }</Text>
                                <Text style={ styles.creator }>Creator: { movie.creator }</Text>
                            </View>
                        </View>

                        {/* Tabs */}
                        <View style={ styles.tabsContainer }>
                            <Tab value={ selectedTab } indicatorStyle={ styles.tabIndicator }>
                                <Tab.Item 
                                    title="My List" 
                                    icon={
                                        <MaterialCommunityIcon 
                                            name="plus"
                                            size={ 24 }
                                            color="white"
                                        />
                                    }
                                    titleStyle={ styles.tabItemTitle }
                                    containerStyle={ styles.tabItemContainer }
                                    onPressIn={ () => handlePressTabs(0) }
                                />
                                <Tab.Item 
                                    title="Like" 
                                    icon={
                                        <FeatherIcon 
                                            name="thumbs-up"
                                            size={ 24 }
                                            color="white"
                                        />
                                    }
                                    titleStyle={ styles.tabItemTitle }
                                    containerStyle={ styles.tabItemContainer }
                                    onPressIn={ () => handlePressTabs(1) }
                                />
                                <Tab.Item 
                                    title="Share" 
                                    icon={
                                        <FeatherIcon 
                                            name="share-2"
                                            size={ 24 }
                                            color="white"
                                        />
                                    }
                                    titleStyle={ styles.tabItemTitle }
                                    containerStyle={ styles.tabItemContainer }
                                    onPressIn={ () => handlePressTabs(2) }
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
                            seasons.map((season, index) => <Picker.Item key={ index } label={ season } value={ season } />)
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
    Movie: movieSelector
})

export default connect(mapStateToProps)(MovieDetailsScreen)
