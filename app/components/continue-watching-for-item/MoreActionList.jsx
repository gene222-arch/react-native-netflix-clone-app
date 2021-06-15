import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ListItem, Icon } from 'react-native-elements';
import styles from './../../assets/stylesheets/moreActionList';

const DisplayAction = ({ actionType }) => 
{
    return (
        <ListItem containerStyle={[ styles.listItemContainer, actionType.containerStyle ]} onPress={ actionType.onPress }>
        {
            actionType.iconName && (
                <Icon 
                    name={ actionType.iconName }
                    type={ actionType.iconType }
                    size={ 24 }
                    color='#fff'  
                    solid={ actionType.isSolid }
                />
            )
        }
        <ListItem.Content>
            <ListItem.Title style={ [styles.listItemTitle, actionType.titleStyle] }>{ actionType.title }</ListItem.Title>
        </ListItem.Content>
        {
            actionType.iconNameOnEnd && (
                <TouchableOpacity onPress={ actionType.onPress }>
                    <Icon 
                        name={ actionType.iconNameOnEnd }
                        type={ actionType.iconType }
                        size={ 24 }
                        color='#fff'  
                    />
                </TouchableOpacity>
            )
        }
    </ListItem>
    )
}

const MoreActionList = ({ selectedVideo, handlePressRemoveRecommendation, handleToggleLikeRecommendation, handleToggleUnLikeRecommendation, isVisible, setIsVisible }) => 
{
    const currentSelectedVideoIsRated = !(selectedVideo.rate === 'like' || selectedVideo.rate === 'not for me');

    const actionList = 
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
            title: currentSelectedVideoIsRated ? 'Like' : 'Rated', 
            iconName: 'thumbs-up',
            iconType: 'font-awesome-5',
            isSolid: selectedVideo.rate === 'like',
            onPress: handleToggleLikeRecommendation,
            show: !selectedVideo.rate || selectedVideo.rate === 'like',
        },
        { 
            title: currentSelectedVideoIsRated ? 'Not For Me' : 'Rated', 
            iconName: 'thumbs-down',
            iconType: 'font-awesome-5',
            isSolid: selectedVideo.rate === 'not for me',
            onPress: handleToggleUnLikeRecommendation,
            show: !selectedVideo.rate || selectedVideo.rate === 'not for me',
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
            isVisible={ isVisible }
            containerStyle={ styles.container }
        >
            {actionList.map((action, i) => action.show && (
                <DisplayAction key={ i } actionType={ action }/>
            ))}
        </BottomSheet>
    )
}

export default MoreActionList
