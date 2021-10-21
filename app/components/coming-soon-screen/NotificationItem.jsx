import React from 'react'
import View from './../View';
import Text from './../Text';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-expo-image-cache';
import Colors from './../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const NotificationItem = ({ id = 1 }) => 
{
    const navigation = useNavigation();

    const handlePress = () => navigation.navigate('TrailerInfo', { id });

    return (
        <TouchableOpacity>
            <View style={ styles.container }>
                <Image 
                    uri='https://laravel-flicklify-files.s3.ap-southeast-1.amazonaws.com/movies/wallpapers/After-Masks-2021-Cover-1633353211.jpg'
                    preview={{ 
                        uri: 'https://laravel-flicklify-files.s3.ap-southeast-1.amazonaws.com/movies/wallpapers/After-Masks-2021-Cover-1633353211.jpg' 
                    }}
                    style={ styles.img }
                />
                <View style={ styles.movieDescriptionContainer }>
                    <Text style={ styles.movieNotifTypeText }>New Arrival</Text>
                    <Text style={ styles.releasedAtText }>Movie Title</Text>
                    <Text style={ styles.releasedAtText }>April 20</Text>
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