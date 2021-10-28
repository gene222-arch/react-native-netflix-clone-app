import React, { useState, useEffect } from 'react'
import { Badge } from 'react-native-elements';
import Colors from './../constants/Colors';
import { InteractionManager } from 'react-native'

const maturedGenres = [
    'violence', 
    'steamy', 
    'gory'
];

const WarningGenreBadge = ({ genres = [] }) => 
{
    const [ maturedGenresSelected, setMaturedGenresSelected ] = useState([]);
    const [ isForMatured, setIsForMatured ] = useState(false);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    let status = 'error';


    useEffect(() => 
    {
        InteractionManager.runAfterInteractions(() => {
            const hasMaturedGenres = genres.filter(genre => maturedGenres.includes(genre));
            setMaturedGenresSelected(hasMaturedGenres);
            setIsForMatured(Boolean(hasMaturedGenres.length));
            setIsInteractionsComplete(true);
        });

        return () => {
            setIsForMatured(false);
            setIsInteractionsComplete(false);
            setMaturedGenresSelected([]);
        }
    }, []);

    return isForMatured && (
        <Badge 
            status={ status } 
            value={ maturedGenresSelected[0].replace(maturedGenresSelected[0][0], maturedGenresSelected[0][0].toUpperCase()) } 
            textStyle={{ 
                color: Colors.white, 
                fontWeight: '700' 
            }} 
        />
    )
}

export default WarningGenreBadge
