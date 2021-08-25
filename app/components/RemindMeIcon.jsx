import React from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const RemindMeIcon = ({ isReminded = false }) => 
{
    if (! isReminded) {
        return (
            <FeatherIcon 
                name='check'
                size={ 28 }
                color='#fff'
            />
        )
    }

    return (
        <MaterialCommunityIcon 
            name='bell'
            size={ 28 }
            color='#fff'
        />
    )
}

export default RemindMeIcon
