import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';
import View from './../View';

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
                            width: 100,
                            aspectRatio: 16/9,
                            borderRadius: 5,
                            marginBottom: 5,
                        },
                    ]}
                />
                <StyledSkeletonContent 
                    containerStyle={{ flex: 1 }}
                    layout={[
                        { 
                            key: `layout-1-${count}`, 
                            width: 150, 
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
                containerStyle={{ marginBottom: 20 }}
                layout={[
                    { 
                        key: '1', 
                        width: 230, 
                        height: 30,
                        marginLeft: 15 
                    }
                ]}
            />
            <MultipleSearchSkeleton count={ count } />
        </>
    )
}

export default SearchScreenLoader
