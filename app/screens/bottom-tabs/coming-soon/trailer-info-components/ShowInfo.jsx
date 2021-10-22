import React from 'react'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import Image from './../../../../components/Image';
import styles from './../../../../assets/stylesheets/trailerInfo';
import { Badge } from 'react-native-elements';
import MaturityRatingBadge from './../../../../components/MaturityRatingBadge';


const ShowInfo = ({ comingSoonMovie }) => 
{
    const { created_at, age_restriction, duration_in_minutes, additional_trailer, plot, casts, directors, title_logo_path } = comingSoonMovie;

    return (
        <View style={ styles.trailerInfo }>
            <Image 
                source={{
                    uri: title_logo_path
                }}
                style={ styles.trailerTitleLogo }
            />
            <View style={ styles.yearDuration }>
                <Text style={ styles.yearDurationText }>{ created_at }</Text>
                <MaturityRatingBadge ageRestriction={ age_restriction } />
                <Text style={ styles.yearDurationText }>{ duration_in_minutes } m</Text>
            </View>
            <Text h4 style={ styles.additionalTrailerText }>{ additional_trailer || 'New Trailer To Be Announce' }</Text>
            <Text style={ styles.plotText }>{ plot }</Text>
            <View style={ styles.starringDirectorContainer }>
                <Text style={ styles.starredArtistsText }><Text style={ styles.starringDesc }>Starring:</Text> { casts }</Text>
                <Text style={ styles.directorText }><Text style={ styles.directorDesc }>Director:</Text> { directors }</Text>
            </View>
        </View>
    )
}

export default ShowInfo
