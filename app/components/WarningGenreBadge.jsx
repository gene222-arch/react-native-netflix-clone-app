import React from 'react'
import { Badge } from 'react-native-elements';
import Colors from './../constants/Colors';

const genres = [
    'violence', 
    'steamy', 
    'gory'
];

const WarningGenreBadge = ({ genre = ''}) => 
{
    let status = 'danger';
    genre = genre.toLowerCase();

    return genres.includes(genre) && (
        <Badge 
            status={ status } 
            value={ genre } 
            textStyle={{ 
                color: Colors.white, 
                fontWeight: '700' 
            }} 
        />
    )
}

export default WarningGenreBadge
