import React from 'react'
import View from './../View';
import Text from './../Text';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-expo-image-cache';
import Colors from './../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const NotificationItem = ({ item }) => 
{
    const navigation = useNavigation();

    const handlePress = () => navigation.navigate('MovieDetailScreen', { 
        id: item.movie_id,
        headerTitle: item.movie.title
    });

    return (
        <TouchableOpacity onPress={ handlePress }>
            <View style={ styles.container }>
                <Image 
                    uri={ item.movie.wallpaper_path }
                    preview={{  uri: item.movie.wallpaper_path  }}
                    style={ styles.img }
                />
                <View style={ styles.movieDescriptionContainer }>
                    <Text style={ styles.movieNotifTypeText }>{ item.type }</Text>
                    <Text style={ styles.releasedAtText }>{ item.movie.title }</Text>
                    <Text style={ styles.releasedAtText }>{ item.created_at }</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default NotificationItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    img: {
        height: 85,
        aspectRatio: 16/9,
        resizeMode: 'cover',
        borderRadius: 5
    },
    movieDescriptionContainer: {
        padding: 10,
        paddingLeft: 15
    },  
    movieNotifTypeText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    releasedAtText: {
        fontSize: 14,
        color: Colors.grey
    }
});