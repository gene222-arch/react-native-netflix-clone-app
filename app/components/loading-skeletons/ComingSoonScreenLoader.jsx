import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../../constants/Dimensions';

const ComingSoonScreenLoader = () => {
    return (
        <StyledSkeletonContent 
            containerStyle={{ flex: 1, justifyContent: 'center', marginTop: 190 }}
            layout={[
                { 
                    key: '1', 
                    width: DEVICE_WIDTH, 
                    height: DEVICE_HEIGHT / 3, 
                    marginTop: 10
                },
                { 
                    key: '2', 
                    width: DEVICE_WIDTH / 2.5, 
                    height: 25,
                    marginTop: 20,
                    marginLeft: 10,
                },
                { 
                    key: '3', 
                    width: DEVICE_WIDTH - 50, 
                    height: 25,
                    marginTop: 20,
                    marginLeft: 10,
                },
                { 
                    key: '4', 
                    width: DEVICE_WIDTH - 100, 
                    height: 25,
                    marginTop: 10,
                    marginLeft: 10,
                },
                { 
                    key: '5', 
                    width: DEVICE_WIDTH - 70, 
                    height: 25,
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 10,
                },
                { 
                    key: '6', 
                    width: DEVICE_WIDTH / 2.5, 
                    height: 25,
                    marginTop: 10,
                    marginBottom: 20,
                    marginLeft: 10,
                },
                { 
                    key: '7', 
                    width: DEVICE_WIDTH, 
                    height: DEVICE_HEIGHT / 3, 
                    marginTop: 10
                },
            ]}
        />
    )
}

export default ComingSoonScreenLoader
