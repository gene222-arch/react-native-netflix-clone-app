import React from 'react'
import styles from './../../../../assets/stylesheets/movieDetail';
import Text from './../../../../components/Text';
import View from './../../../../components/View';
import { Badge } from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ movie }) => 
{
    const { title, year, total_number_of_seasons } = movie;

    return (
        <View style={ styles.movieTitleContainer }>
            <Text h3 style={ styles.title }>{ title }</Text>
            <View style={ styles.movieTitleInfo }>
                <Text style={ styles.match }>{ '98%' } Match </Text>
                <Text style={ styles.year }>{ year }</Text>
                <Badge status='warning' value='12+' textStyle={ styles.ageContainerText }/>
                <Text style={ styles.seasons }>{ `${ total_number_of_seasons } Seasons` }</Text>
                <MaterialCommunityIcon name='high-definition-box' color='#fff' size={ 30 }/>
            </View>
        </View>
    )
}

export default Header
