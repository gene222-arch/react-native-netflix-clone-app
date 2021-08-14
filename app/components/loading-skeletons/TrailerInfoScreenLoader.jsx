import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../../constants/Dimensions';

const TrailerInfoScreenLoader = () => {
    return (
        <>
            <StyledSkeletonContent 
                containerStyle={{ flex: 1, justifyContent: 'center', marginTop: 250 }}
                layout={[
                    { 
                        key: '1', 
                        width: DEVICE_WIDTH, 
                        height: DEVICE_HEIGHT / 3, 
                        marginTop: 10
                    },
                    { 
                        key: '2', 
                        width: DEVICE_WIDTH / 2, 
                        height: 40,
                        marginTop: 10,
                        marginLeft: 10,
                    },
                    { 
                        key: '3', 
                        width: DEVICE_WIDTH / 1.75, 
                        height: 25,
                        marginTop: 10,
                        marginLeft: 10,
                    },
                    { 
                        key: '4', 
                        width: DEVICE_WIDTH - 60, 
                        height: 25,
                        marginTop: 20,
                        marginLeft: 10,
                    },
                    { 
                        key: '5', 
                        width: DEVICE_WIDTH - 100, 
                        height: 25,
                        marginTop: 10,
                        marginLeft: 10,
                    },
                    { 
                        key: '6', 
                        width: DEVICE_WIDTH - 70, 
                        height: 25,
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                    },
                    { 
                        key: '7', 
                        width: DEVICE_WIDTH / 2.5, 
                        height: 25,
                        marginTop: 10,
                        marginBottom: 20,
                        marginLeft: 10,
                    },
                    { 
                        key: '8', 
                        width: DEVICE_WIDTH / 2.5, 
                        height: 25,
                        marginBottom: 20,
                        marginLeft: 10,
                    },
                    { 
                        key: '9', 
                        width: DEVICE_WIDTH / 1.25, 
                        height: 70,
                        marginBottom: 20,
                        marginLeft: 10,
                    },
                ]}
            />
            <StyledSkeletonContent 
                containerStyle={{ flex: 1, justifyContent: 'center' }}
                layout={[
                    { 
                        key: '11', 
                        width: DEVICE_WIDTH / 1.25, 
                        height: 30,
                        marginTop: 130,
                        marginBottom: 20,
                        marginLeft: 10,
                    }
                ]}
            />
        </>
    )
}

export default TrailerInfoScreenLoader
