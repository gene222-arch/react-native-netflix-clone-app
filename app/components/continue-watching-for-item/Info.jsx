import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ListItem, Divider, Button } from 'react-native-elements';
import styles from './../../assets/stylesheets/info';
import Text from './../Text';
import View from './../View';
import Image from './../Image';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import VideoPlayerFullScreen from './../VideoPlayerFullScreen';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { getCachedFile } from './../../utils/cacheImage';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const DEFAULT_SHOW = {
    id: '',
    title: '',
    genres: '',
    author: '',
    plot: '',
    wallpaper_path: '',
    duration: '',
    age_restriction: '',
    year: '',
    total_number_of_episodes: '',
    total_number_of_seasons: '',
    poster_path: '',
    trailer_video_path: ''
};

const Info = ({ AUTH_PROFILE, selectedShow, isVisible, setIsVisible }) => 
{   
    selectedShow = !selectedShow ? DEFAULT_SHOW : selectedShow;


    const navigation = useNavigation();

    const [ showVideo, setShowVideo ] = useState(false);

    const handlePlayVideo = () => {
        navigation.setOptions({ headerShown: false });
        setShowVideo(true);
    }

    const handleCloseVideo = () => {
        navigation.setOptions({ headerShown: true });
        setShowVideo(false);
    }

    const handlePressNavigateToShowDetailScreen = () => navigation.navigate('MovieDetailScreen', { id: selectedShow?.id });

    useEffect(() => {
        return () => {
            setShowVideo(false);
        }
    }, []);

    if (showVideo) 
    {
        return (
            <VideoPlayerFullScreen 
                uri={ selectedShow?.trailer_video_path }
                handleCloseVideo={ handleCloseVideo }
            />
        )
    }

    return (
        <BottomSheet
            isVisible={ isVisible }
            containerStyle={ styles.container }
        >
            <StatusBar backgroundColor='rgba(0, 0, 0, .8)' />
            <View style={ styles.posterContainer }>
                <ListItem containerStyle={ styles.showDetails }>
                    <Image 
                        source={{ uri: getCachedFile(`RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/Posters/`, selectedShow?.id, selectedShow?.poster_path) }}
                        style={ styles.poster }
                    />
                    <ListItem.Content>
                        <View style={ styles.posterDetails }>
                            <View style={ styles.titleCloseBtnContainer }>
                                <Text h4 style={ styles.title }>{  selectedShow?.title }</Text>
                                <TouchableOpacity onPress={ () => setIsVisible(false) }>
                                    <FeatherIcon 
                                        name='x-circle'
                                        size={ 24 }
                                        color='#fff'
                                        style={ styles.closeBtn }
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={ styles.basicDetail }>
                                <Text style={ styles.yearAgeSeason }>{ selectedShow?.year }</Text>
                                <Text style={ styles.yearAgeSeason }>{ selectedShow?.age_restriction }+</Text>
                                <Text style={ styles.yearAgeSeason }>{ selectedShow?.total_number_of_seasons } Seasons</Text>
                            </View>
                            <Text style={ styles.plot }>{ selectedShow?.plot.slice(0, 250).concat('...') }</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>

                {/* Action Buttons */}
                <View style={ styles.actionBtns }>
                    <Button
                        title='   Play'
                        icon={
                            <FontAwesome5Icon 
                                name='play'
                                size={ 22 }
                                color='#000'
                                solid
                            />
                        }
                        titleStyle={ styles.playBtnTitle }
                        buttonStyle={ styles.playBtn }
                    />
                    <Button
                        type='clear' 
                        title='Download'
                        icon={
                            <FeatherIcon 
                                name='download'
                                size={ 26 }
                                color='#fff'
                            />
                        }
                        iconPosition='top'
                        buttonStyle={ styles.downloadBtn }
                        titleStyle={ styles.actionBtnTitle }
                    />
                    <Button
                        type='clear' 
                        title='Preview'
                        icon={
                            <FeatherIcon 
                                name='play'
                                size={ 26 }
                                color='#fff'
                            />
                        }
                        iconPosition='top'
                        buttonStyle={ styles.previewBtn }
                        titleStyle={ styles.actionBtnTitle }
                        onPress={ handlePlayVideo }
                    />
                </View>          
            </View>
            <Divider />
            {/* Episode and Info */}
            <TouchableOpacity onPress={ handlePressNavigateToShowDetailScreen }>
                <ListItem containerStyle={ styles.episodeAndInfoContainer }>
                    <FeatherIcon 
                        name='info'
                        size={ 24 }
                        color='#fff'
                    />
                    <ListItem.Content style={ styles.listItemContent }>
                        <ListItem.Title style={ styles.episodeAndInfoTitle }>Episode & Info</ListItem.Title>
                    </ListItem.Content>
                    <FeatherIcon 
                        name='chevron-right'
                        size={ 24 }
                        color='#fff'
                    />
            </ListItem> 
            </TouchableOpacity>  
        </BottomSheet>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(Info)
