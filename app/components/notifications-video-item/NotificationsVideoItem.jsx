import React, { useState, useRef } from 'react'
import { Video } from 'expo-av';
import styles from './../../assets/stylesheets/notificationsVideoItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../View';
import Text from './../Text';
import Image from './../Image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsVideoItem = ({ comingSoon, shouldPlay, shouldShowPoster, shouldFocus, handlePressToggleRemindMe, isReminded }) => 
{
    const video = useRef(null);

    return (
        <View style={{ ...styles.container, opacity: shouldFocus ? 1 : 0.25 }}>
            <Video 
                ref={ video }
                style={ styles.video }
                source={{
                    uri: comingSoon.video
                }}
                posterSource={{ uri: comingSoon.poster }}
                posterStyle={ styles.posterStyle}
                usePoster={ shouldShowPoster }
                shouldPlay={ shouldPlay }
                resizeMode='contain'
                useNativeControls
            />
            <View style={ styles.comingSoonVideoContainer }>
                <Image 
                    source={{
                        uri: comingSoon.title_logo
                    }}
                    style={ styles.poster }
                />
                <View style={ styles.remindMeInfoContainer }>
                    <TouchableOpacity onPress={ handlePressToggleRemindMe }>
                        <View style={ styles.remindMeContainer }>
                            {
                                !isReminded 
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
                        <Text key={ index } style={ styles.tags }>
                            { (comingSoon.tags.length - 1) === index ? tag : `${ tag }  ·  ` }
                        </Text>
                    ))
                }
                </View>
            </View>
        </View>
    )
}

const dynamicFocus = (paramStyle) => StyleSheet.create({
    paramStyle
});

export default NotificationsVideoItem
