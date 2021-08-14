import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../../constants/Dimensions';
import View from './../View';

const MultipleDownloadSkeleton = ({ count = 2 }) => 
{
    let loaders = [];

    while(count !== 0) {
        loaders.push(
            <View key={ count } style={{ flexDirection: 'row', alignItems: 'center' }}>
                <StyledSkeletonContent 
                    containerStyle={{ flex: 1 }}
                    layout={[
                        { 
                            key: `layout-1-${ count }`, 
                            width: 180, 
                            height: 100,
                            marginTop: 20,
                            marginHorizontal: 10,
                        },
                    ]}
                />
                <StyledSkeletonContent 
                    containerStyle={{ flex: 1 }}
                    layout={[
                        { 
                            key: `layout-1-${count}`, 
                            width: 120, 
                            height: 15,
                            marginTop: 10,
                        },
                        { 
                            key: `layout-2-${count}`, 
                            width: 140, 
                            height: 15,
                            marginTop: 10,
                        },
                    ]}
                />
            </View>
        )

        count--;
    }

    return loaders;
}

const DownloadScreenLoader = ({ count = 5 }) => <MultipleDownloadSkeleton count={ count } />

export default DownloadScreenLoader
