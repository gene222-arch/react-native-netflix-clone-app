import React from 'react'
import { Button, Image } from 'react-native'
import View from './../../../components/View';
import Text from './../../../components/Text';
import styles from './../../../assets/stylesheets/homeScreen';
import HomeCategory from '../../../components/home-category/HomeCategory';
import categories from './../../../services/data/categories';
import { FlatList } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => 
{
    return (
        <View style={ styles.container }>
            <FlatList 
                data={ categories.items }
                renderItem={({ item }) => (
                    <HomeCategory 
                        title={ item.title }
                        categories={ item.movies }
                    />
                )}
            />
        </View>
    )
}

export default HomeScreen
