import React from 'react'
import View from './../View';
import Text from './../Text';
import styles from '../../assets/stylesheets/searchItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-expo-image-cache';


const SearchItem = ({ uri, title, onPress }) => 
{
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ styles.container }>
                <View style={ styles.imageContainer }>
                    <Image  
                        preview={{ uri }}
                        uri={ uri }
                        style={ styles.image }
                    />
                </View>
                <View style={ styles.titlePlayIconContainer }>
                    <Text style={ styles.title }>{ title }</Text>
                    <Ionicon 
                        name='play-circle-outline'
                        size={ 30 }
                        color='#FFFFFF'
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchItem
