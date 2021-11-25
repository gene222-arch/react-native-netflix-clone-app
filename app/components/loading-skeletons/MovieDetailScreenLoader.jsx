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
                        key: '4', 
                        width: DEVICE_WIDTH, 
                        height: 50,
                        marginTop: 30,
                    },
                    { 
                        key: '7', 
                        width: DEVICE_WIDTH, 
                        height: 15,
                        marginTop: 10,
                    },
                    { 
                        key: '27', 
                        width: DEVICE_WIDTH, 
                        height: 15,
                        marginTop: 10,
                    },
                    { 
                        key: 'A27', 
                        width: DEVICE_WIDTH / 2, 
                        height: 15,
                        marginTop: 10,
                    },
                    { 
                        key: '67', 
                        width: DEVICE_WIDTH / 2, 
                        height: 15,
                        marginTop: 10,
                    },
                    { 
                        key: '81', 
                        width: DEVICE_WIDTH / 2, 
                        height: 15,
                        marginTop: 10,
                    },
                    { 
                        key: '9', 
                        width: DEVICE_WIDTH / 1.15, 
                        height: 60,
                        marginTop: 15,
                        marginBottom: 20,
                        marginLeft: 10,
                    },
                ]}
            />
        </>
    )
}

export default MovieDetailScreenLoader
