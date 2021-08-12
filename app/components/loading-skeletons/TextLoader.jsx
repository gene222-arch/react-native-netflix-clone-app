import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';

const TextLoader = ({ numberOfLines = 1, width = 280, height = 15 }) => 
{

    const displayLayout = () => {
        let layout = [];

        while(numberOfLines !== 0) {
            layout.push({ 
                key: numberOfLines.toString(), 
                width, 
                height, 
                marginTop: 15,
                marginBottom: 5
            });

            numberOfLines--;
        }

        return layout;
    }

    return (
        <StyledSkeletonContent 
            containerStyle={{ flex: 1 }}
            layout={ displayLayout() }
        />
    )
}

export default TextLoader
