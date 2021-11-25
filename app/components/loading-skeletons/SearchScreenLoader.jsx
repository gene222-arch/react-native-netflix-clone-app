import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';
import View from './../View';
import { DEVICE_WIDTH } from './../../constants/Dimensions';

const MultipleSearchSkeleton = ({ count = 0 }) => 
{
    let loaders = [];

    while(count !== 0) {
        loaders.push(
            <View key={ count } style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <StyledSkeletonContent 
                    containerStyle={{ flex: 1 }}
                    layout={[
                        { 
                            key: `layout-1-${ count }`, 
                            height: 80,
                            width: 150,
                            borderRadius: 5,
                            marginBottom: 5,
                            marginLeft: 5,
                        },
                    ]}
                />
                <StyledSkeletonContent 
                    containerStyle={{ flex: 1 }}
                    layout={[
                        { 
                            key: `layout-1-${count}`, 
                            width: 170, 
                            height: 15,
                        }
                    ]}
                />
            </View>
        )

        count--;
    }

    return loaders;
}

const SearchScreenLoader = ({ count = 10 }) => 
{
    return (
        <>
            <StyledSkeletonContent 
                containerStyle={{ marginBottom: 30 }}
                layout={[
                    { 
                        key: '1', 
                        width: DEVICE_WIDTH, 
                        height: 50
                    }
                ]}
            />
                <StyledSkeletonContent 
                containerStyle={{ marginBottom: 40 }}
                layout={[
                    { 
                        key: '1', 
                        width: 280, 
                        height: 40,
                        marginLeft: 15
                    }
                ]}
            />
            <MultipleSearchSkeleton count={ count } />
        </>
    )
}

export default SearchScreenLoader
