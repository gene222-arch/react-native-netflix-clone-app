import React from 'react'
import StyledSkeletonContent from './../styled-components/StyledSkeletonContent';
import View from './../View';

const MultipleNotificationItemSkeleton = ({ count = 2 }) => 
{
    let loaders = [];

    while(count !== 0) {
        loaders.push(
            <View key={ count } style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <StyledSkeletonContent 
                    containerStyle={{ flex: 1 }}
                    layout={[
                        { 
                            key: `layout-1-${ count }`, 
                            width: 150, 
                            height: 85,
                            marginTop: 20,
                            marginHorizontal: 10
                        },
                    ]}
                />
                <StyledSkeletonContent 
                    containerStyle={{ flex: 1, marginLeft: 15 }}
                    layout={[
                        { 
                            key: `layout-1-${count}`, 
                            width: 100, 
                            height: 15,
                            marginTop: 10,
                        },
                        { 
                            key: `layout-2-${count}`, 
                            width: 150, 
                            height: 15,
                            marginTop: 10,
                        },
                        { 
                            key: `layout-3-${count}`, 
                            width: 80, 
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

const NotificationsScreenLoader = () => <MultipleNotificationItemSkeleton count={ 7 } />

export default NotificationsScreenLoader
