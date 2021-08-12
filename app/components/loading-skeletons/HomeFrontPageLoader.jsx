import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';

const HomeFrontPageLoader = () => {
    return (
        <StyledSkeletonContent 
            containerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200 }}
            layout={[
                { 
                    key: '1', 
                    width: 250, 
                    height: 120, 
                    marginTop: 100 
                },
                { 
                    key: '2', 
                    width: 280, 
                    height: 15,
                    marginTop: 20,
                },
                { 
                    key: '3', 
                    width: 120, 
                    height: 50,
                    marginTop: 20,
                },
            ]}
        />
    )
}

export default HomeFrontPageLoader
