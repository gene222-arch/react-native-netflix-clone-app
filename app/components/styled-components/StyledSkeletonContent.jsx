import React from 'react'
import SkeletonContent from 'react-native-skeleton-content'
import Colors from './../../constants/Colors';

const StyledSkeletonContent = ({ isLoading, ...props }) => {
    return (
        <SkeletonContent
            containerStyle={{ flex: 1 }}
            boneColor={ Colors.darkMode }
            highlightColor={ Colors.darkGrey }
            animationType='pulse'
            isLoading={ isLoading }
            { ...props }
        />
    )
}

export default StyledSkeletonContent
