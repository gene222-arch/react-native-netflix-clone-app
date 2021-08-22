import React from 'react'
import View from './../View';
import styles from './../../assets/stylesheets/notificationsVideoItem';
import { TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './../Text';
import { Image } from 'react-native-expo-image-cache';


const RemindMeIcon = ({ isReminded = false }) => 
{
    if (! isReminded) {
        return (
            <FeatherIcon 
                name='check'
                size={ 28 }
                color='#fff'
            />
        )
    }

    if (isReminded) {
        return (
            <MaterialCommunityIcon 
                name='bell'
                size={ 28 }
                color='#fff'
            />
        )
    }
}

const ComingSoonMovieButtons = ({ movie, handlePressToggleRemindMe, handlePressInfo, isReminded = false}) => 
{
    return (
        <View style={ styles.comingSoonVideoContainer }>
            <Image 
                uri={ movie.title_logo_path }
                style={ styles.poster }
            />
            <View style={ styles.remindMeInfoContainer }>
                <TouchableOpacity onPress={ handlePressToggleRemindMe }>
                    <View style={ styles.remindMeContainer }>
                        <RemindMeIcon isReminded={ isReminded } />
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
    )
}

export default ComingSoonMovieButtons
