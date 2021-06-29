import React from 'react'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import Image from './../../../../components/Image';
import styles from './../../../../assets/stylesheets/trailerInfo';


const ShowInfo = ({ comingSoonShow }) => 
{
    const { year, age_restriction, duration, additional_trailer, plot, starred_artists, director, title_logo } = comingSoonShow;

    return (
        <View style={ styles.trailerInfo }>
            <Image 
                source={{
                    uri: title_logo
                }}
                style={ styles.trailerTitleLogo }
            />
            <View style={ styles.yearDuration }>
                <Text style={ styles.yearDurationText }>{ year }</Text>
                <Text style={ styles.ageRestrictionText }>{ age_restriction }+</Text>
                <Text style={ styles.yearDurationText }>{ duration }</Text>
            </View>
            <Text h4 style={ styles.additionalTrailerText }>{ additional_trailer }</Text>
            <Text style={ styles.plotText }>{ plot }</Text>
            <View style={ styles.starringDirectorContainer }>
                <Text style={ styles.starredArtistsText }><Text style={ styles.starringDesc }>Starring:</Text> { starred_artists }</Text>
                <Text style={ styles.directorText }><Text style={ styles.directorDesc }>Director:</Text> { director }</Text>
            </View>
        </View>
    )
}

export default ShowInfo
