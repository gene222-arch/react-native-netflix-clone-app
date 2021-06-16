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

const DisplayTags = ({ tagsLength, tagName, index}) => {
    return (
        <Text style={ styles.tags }>
            { (tagsLength - 1) === index ? tagName : `${ tagName }  ·  ` }
        </Text>
    )
}


const NotificationsVideoItem = ({ comingSoon, shouldPlay, shouldShowPoster, shouldFocus, handlePressToggleRemindMe, isReminded }) => 
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
                source={{ uri: getCachedFile('ComingSoon/Videos/', comingSoon.id, comingSoon.video) }}
                posterSource={{ uri: getCachedFile('ComingSoon/Posters/', comingSoon.id, comingSoon.poster) }}
                posterStyle={ styles.posterStyle}
                usePoster={ shouldShowPoster }
                shouldPlay={ shouldPlay }
                resizeMode='contain'
                useNativeControls
            />
            <View style={ styles.comingSoonVideoContainer }>
                <Image 
                    source={{
                        uri: `${ FileSystem.cacheDirectory }ComingSoon/TitleLogos/${ comingSoon.id }.${ getExtension(comingSoon.title_logo) }`
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
                    <TouchableOpacity>
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
                    comingSoon.tags.map((tag, index) => (
                        <DisplayTags 
                            key={ index } 
                            tagsLength={ comingSoon.tags.length }
                            tagName={ tag }
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
