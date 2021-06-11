import React from 'react'
import View from './../View';
import Text from './../Text';
import Image from './../Image';
import styles from '../../assets/stylesheets/searchItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchItem = ({ uri, title, onPress }) => 
{
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ styles.container }>
                <Image 
                    source={{ uri }}
                    style={ styles.image }
                />
                <View style={ styles.titlePlayIconContainer }>
                    <Text style={ styles.title }>{ title }</Text>
                    <FeatherIcon 
                        name='play-circle'
                        size={ 24 }
                        color='#fff'
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchItem
