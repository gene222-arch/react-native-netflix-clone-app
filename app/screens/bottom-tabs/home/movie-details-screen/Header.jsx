import React from 'react'
import styles from './../../../../assets/stylesheets/movieDetail';
import Text from './../../../../components/Text';
import View from './../../../../components/View';
import { Badge } from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaturityRatingBadge from './../../../../components/MaturityRatingBadge';
import WarningGenreBadge from './../../../../components/WarningGenreBadge';

const Header = ({ movie }) => 
{
    const { title, year_of_release, age_restriction, genres } = movie;

    return (
        <View style={ styles.movieTitleContainer }>
            <Text h3>{ title }</Text>
            <View style={ styles.movieTitleInfo }>
                <Text style={ styles.year }>{ year_of_release }</Text>
                <MaturityRatingBadge ageRestriction={ age_restriction } />
                <WarningGenreBadge genres={ genres.split(',').map(genre => genre.trim().toLowerCase()) } />
                <MaterialCommunityIcon name='high-definition-box' color='#fff' size={ 30 }/>
            </View>
        </View>
    )
}

export default Header
