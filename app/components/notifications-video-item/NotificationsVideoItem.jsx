import React, { useState, useRef, useEffect } from 'react'
import { Video } from 'expo-av';
import styles from './../../assets/stylesheets/notificationsVideoItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../View';
import Text from './../Text';
import Image from './../Image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as FileSystem from 'expo-file-system'
import { getExtension } from './../../utils/file';
import { getCachedFile } from './../../utils/cacheImage';

const DisplayGenres = ({ genreLength, genreName, index}) => {
    return (
        <Text style={ styles.tags }>
            { (genreLength - 1) === index ? genreName : `${ genreName }  ·  ` }
        </Text>
    )
}


const NotificationsVideoItem = ({ 
    comingSoon, 
    shouldPlay, 
    shouldShowPoster, 
    shouldFocus, 
    handlePressToggleRemindMe, 
    handlePressInfo, 
    isReminded
}) => 
{
    const video = useRef(null);

    const handleChangeIsReminded = () => 
    {
        return !isReminded 
        ? (
            <FeatherIcon 
                name='check'
                size={ 28 }
                color='#fff'
            />
        )
        : (
            <MaterialCommunityIcon 
                name='bell'
                size={ 28 }
                color='#fff'
            />
        )
    }

    useEffect(() => {
        return () => {
            video.current = null;
        }
    }, []);

    return (
        <View style={{ ...styles.container, opacity: shouldFocus ? 1 : 0.25 }}>
            <Video 
                ref={ video }
                style={ styles.video }
                // source={{ uri: getCachedFile('ComingSoon/Videos/', comingSoon.id, comingSoon.video_trailer_path) }}
                // posterSource={{ uri: getCachedFile('ComingSoon/VideoPosters/', comingSoon.id, comingSoon.poster_path) }}
                source={{ uri: comingSoon.video_trailer_path }}
                posterSource={{ uri: comingSoon.poster_path }}
                posterStyle={ styles.posterStyle}
                usePoster={ shouldShowPoster }
                shouldPlay={ shouldPlay }
                resizeMode='contain'
                useNativeControls
            />
            <View style={ styles.comingSoonVideoContainer }>
                <Image 
                    source={{
                        // uri: `${ FileSystem.cacheDirectory }ComingSoon/TitleLogos/${ comingSoon.id }.${ getExtension(comingSoon.title_logo_path) }`
                        uri: comingSoon.title_logo_path
                    }}
                    style={ styles.poster }
                />
                <View style={ styles.remindMeInfoContainer }>
                    <TouchableOpacity onPress={ handlePressToggleRemindMe }>
                        <View style={ styles.remindMeContainer }>
                            { handleChangeIsReminded() }
                            <Text style={ styles.remindMeInfoText }>Remind Me</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ handlePressInfo }>
                        <View style={ styles.infoContainer }>
                            <FeatherIcon 
                                name='info'
                                size={ 28 }
                                color='#fff'
                            />
                            <Text style={ styles.remindMeInfoText }>Info</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={ styles.videoInfo }>
                <Text style={ styles.additionalInfoText }>{ comingSoon.additional_trailer }</Text>
                <Text style={ styles.title }>{ comingSoon.title }</Text>
                <Text style={ styles.plot }>{ comingSoon.plot }</Text>
                <View style={ styles.tagsContainer }>
                {
                    comingSoon.genres.split(',').map((genre, index) => (
                        <DisplayGenres 
                            key={ index } 
                            genreLength={ comingSoon.genres.length }
                            genreName={ genre }
                            index={ index }
                        />
                    ))
                }
                </View>
            </View>
        </View>
    )
}

export default NotificationsVideoItem
