import React from 'react'
import View from '../../../../components/View';
import styles from '../../../../assets/stylesheets/movieDetail';
import { Button } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';

const MovieDetailPlayButton = ({ videoStatus, isRecentlyWatched, handlePressPauseVideo, handlePressPlayVideo }) => 
{
    return (
        <View style={ styles.playDownloadBtnContainer }> 
            <Button
                icon={
                    <Ionicon
                        name={ videoStatus?.isPlaying && !isRecentlyWatched ? 'pause' : 'play' }
                        size={ 24 }
                        color='black'
                    />
                }
                title={ !isRecentlyWatched ? 'Play' : 'Resume' }
                buttonStyle={ styles.playBtn }
                titleStyle={ styles.playBtnTitle }
                onPress={ () => {
                    videoStatus?.isPlaying ? handlePressPauseVideo() : handlePressPlayVideo()
                }}
                disabled={ !videoStatus?.isLoaded }
                loading={ !videoStatus?.isLoaded }
                loadingStyle={ styles.loadingStyle }
            />
        </View>

    )
}

export default MovieDetailPlayButton
