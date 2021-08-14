import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../../constants/Dimensions';

const MovieDetailScreenLoader = () => {
    return (
        <>
            <StyledSkeletonContent 
                containerStyle={{ justifyContent: 'center', marginTop: 5 }}
                layout={[
                    { 
                        key: '1', 
                        width: DEVICE_WIDTH, 
                        height: DEVICE_HEIGHT / 3.5
                    },
                    { 
                        key: '2', 
                        width: DEVICE_WIDTH / 1.5, 
                        height: 30,
                        marginTop: 10,
                        marginLeft: 10,
                    },
                    { 
                        key: '23', 
                        width: DEVICE_WIDTH / 1.25, 
                        height: 20,
                        marginTop: 10,
                        marginLeft: 10,
                    },
                    { 
                        key: '3', 
                        width: DEVICE_WIDTH - 10, 
                        height: 40,
                        marginTop: 30,
                    },
                    { 
                        key: '4', 
                        width: DEVICE_WIDTH - 10, 
                        height: 40,
                        marginTop: 10,
                    },
                    { 
                        key: '5', 
                        width: DEVICE_WIDTH - 40, 
                        height: 25,
                        marginTop: 20,
                        marginLeft: 10,
                    },
                    { 
                        key: '56', 
                        width: DEVICE_WIDTH - 100, 
                        height: 25,
                        marginTop: 5,
                        marginLeft: 10,
                    },
                    { 
                        key: '6', 
                        width: DEVICE_WIDTH - 20, 
                        height: 25,
                        marginTop: 5,
                        marginBottom: 10,
                        marginLeft: 10,
                    },
                    { 
                        key: '7', 
                        width: DEVICE_WIDTH - 20, 
                        height: 15,
                        marginLeft: 10,
                        marginBottom: 10,
                    },
                    { 
                        key: '8', 
                        width: DEVICE_WIDTH - 20, 
                        height: 15,
                        marginLeft: 10,
                        marginBottom: 10,
                    },
                    { 
                        key: '9', 
                        width: DEVICE_WIDTH / 1.25, 
                        height: 50,
                        marginTop: 10,
                        marginBottom: 20,
                        marginLeft: 10,
                    },
                ]}
            />
        </>
    )
}

export default MovieDetailScreenLoader
