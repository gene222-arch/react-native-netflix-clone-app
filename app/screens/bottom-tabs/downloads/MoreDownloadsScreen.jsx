import React, { useState, useEffect } from 'react'
import View from './../../../components/View';
import styles from './../../../assets/stylesheets/moreDownloads';
import downloadsWithSeries from './../../../services/data/downloadsWithSeries';
import { FlatList } from 'react-native-gesture-handler';
import MoreDownloadsSeason from './../../../components/more-downloads-season/MoreDownloadsSeason';
import PlayDownloadScreen from './PlayDownloadScreen';


const MoreDownloadsScreen = ({ route }) => 
{
    const { id } = route.params;

    const [ videoToPlay, setVideoToPlay ] = useState({ id: '', video: '' });
    const [ videos, setVideos ] = useState([]);
    const [ seasons, setSeasons ] = useState([]);
    const [ showVideo, setShowVideo ] = useState(false);

    const onLoadFetchDownloadsByID = () => {
        const { videos: videos_, download_id } = downloadsWithSeries.find(({ download_id }) => download_id === id);
        const seasons_ = videos_.map(video => video.seasons)[0];

        setVideos(videos_);
        setSeasons(seasons_);
    }

    const handlePressPlayVideo = (video) => {
        setVideoToPlay(video);
        setShowVideo(true);
    }

    useEffect(() => {
        onLoadFetchDownloadsByID();
    },[]);

    if (showVideo) {
        return <PlayDownloadScreen uri={ videoToPlay.video } setShowVideo={ setShowVideo }/>
    }

    return (
        <View style={ styles.container }>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ seasons }
                renderItem={ ({ item }) => (
                    <MoreDownloadsSeason season={ item } onPress={ handlePressPlayVideo }/>
                )}
            />
        </View>
    )
}

export default MoreDownloadsScreen
