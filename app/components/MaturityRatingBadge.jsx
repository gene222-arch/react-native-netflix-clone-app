import React from 'react'
import { Badge } from 'react-native-elements';
import Colors from './../constants/Colors';

const MaturityRatingBadge = ({ ageRestriction }) => 
{
    let status = 'success';
    let color = Colors.white;

    if (ageRestriction >= 13 && ageRestriction < 16) {
        status = 'warning';
        color = Colors.dark;
    }

    if (ageRestriction >= 18) {
        status = 'error';
    }

    return <Badge status={ status } value={ `${ ageRestriction }+` } badgeStyle={{ color }} />
}

export default MaturityRatingBadge
