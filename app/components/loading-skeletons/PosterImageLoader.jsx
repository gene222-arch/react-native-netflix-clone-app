import React from 'react'
import StyledSkeletonContent from '../styled-components/StyledSkeletonContent';

const PosterImageLoader = ({ width = 125, height = 170 }) => {
    return (
        <StyledSkeletonContent 
            containerStyle={{ flex: 1 }}
            layout={[
                { 
                    key: 'key', 
                    width,
                    height,
                    marginRight: 10,
                },
            ]}
        />
    )
}

export default PosterImageLoader
