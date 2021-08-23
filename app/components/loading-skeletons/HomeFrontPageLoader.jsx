import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';

const HomeFrontPageLoader = () => {
    return (
        <>
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
                    { 
                        key: '23', 
                        width: 280, 
                        height: 20,
                        marginTop: 50,
                        alignSelf: 'flex-start'
                    }
                ]}
            />
             <StyledSkeletonContent 
                containerStyle={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                layout={[
                    { 
                        key: 'layout2-1', 
                        width: 125, 
                        height: 170,
                        marginHorizontal: 5
                    },
                    { 
                        key: 'layout2-2', 
                        width: 125, 
                        height: 170,
                        marginHorizontal: 5
                    },
                    { 
                        key: 'layout2-3', 
                        width: 125, 
                        height: 170,
                        marginHorizontal: 5
                    }
                ]}
            />
        </>
    )
}

export default HomeFrontPageLoader
