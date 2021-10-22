import React from 'react'
import { Badge } from 'react-native-elements';

const MaturityRatingBadge = ({ ageRestriction }) => 
{
    let status = 'success';

    if (ageRestriction >= 13 && ageRestriction < 16) {
        status = 'warning';
    }

    if (ageRestriction >= 18) {
        status = 'error';
    }

    return <Badge status={ status } value={ `${ ageRestriction }+` } />
}

export default MaturityRatingBadge
