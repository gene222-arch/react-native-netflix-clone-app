import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ListItem, Icon } from 'react-native-elements';
import styles from './../../assets/stylesheets/moreActionList';


const MoreActionList = ({ selectedVideo , handlePressRemoveRecommendation, handleToggleLikeRecommendation, isVisible, setIsVisible }) => 
{
    const list = 
    [
        {
            title: selectedVideo?.title ?? '',
            titleStyle: styles.moreActionHeader,
            iconNameOnEnd: 'x-circle',
            iconType: 'feather',
            containerStyle: styles.moreActionHeaderContainer,
            onPress: () => setIsVisible(false),
            show: true,
        },
        { 
            title: 'Episodes and Info', 
            iconName: 'info',
            iconType: 'feather',
            show: true,
        },
        { 
            title: 'Download Episode', 
            iconName: 'download',
            iconType: 'feather',
            show: true,
        },
        { 
            title: !selectedVideo.isLiked ? 'Like' : 'Rated', 
            iconName: 'thumbs-up',
            iconType: 'font-awesome-5',
            isSolid: selectedVideo.isLiked,
            onPress: handleToggleLikeRecommendation,
            show: true,
        },
        { 
            title: 'Not For Me', 
            iconName: 'thumbs-down',
            iconType: 'font-awesome-5',
            show: !selectedVideo.isLiked,
        },
        {
            title: 'Remove From Row',
            iconName: 'trash',
            iconType: 'feather',
            onPress: handlePressRemoveRecommendation,
            show: true,
        },
    ];

    return (
        <BottomSheet
            isVisible={isVisible}
            containerStyle={ styles.container }
        >
            {list.map((l, i) => l.show && (
                <ListItem key={ i } containerStyle={[ styles.listItemContainer, l.containerStyle ]} onPress={ l.onPress }>
                    {
                        l.iconName && (
                            <Icon 
                                name={ l.iconName }
                                type={ l.iconType }
                                size={ 24 }
                                color='#fff'  
                                solid={ l.isSolid }
                            />
                        )
                    }
                    <ListItem.Content>
                        <ListItem.Title style={ [styles.listItemTitle, l.titleStyle] }>{ l.title }</ListItem.Title>
                    </ListItem.Content>
                    {
                        l.iconNameOnEnd && (
                            <TouchableOpacity onPress={ l.onPress }>
                                <Icon 
                                    name={ l.iconNameOnEnd }
                                    type={ l.iconType }
                                    size={ 24 }
                                    color='#fff'  
                                />
                            </TouchableOpacity>
                        )
                    }
                </ListItem>
            ))}
        </BottomSheet>
    )
}

export default MoreActionList
