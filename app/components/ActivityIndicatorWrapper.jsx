import React from 'react'
import { ActivityIndicator } from 'react-native';

const ActivityIndicatorWrapper = ({ isLoading = false, component}) => 
{
    return (
        !isLoading 
            ? component 
            : <ActivityIndicator color='#FFF' />
    )
}

export default ActivityIndicatorWrapper
