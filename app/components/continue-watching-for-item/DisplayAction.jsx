import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import styles from './../../assets/stylesheets/moreActionList';
import VIDEO_STATUSES from './../../config/video.statuses';

const DisplayAction = ({ actionType }) => 
{
    return (
        <TouchableOpacity onPress={ actionType.onPress }>
            <ListItem containerStyle={[ styles.listItemContainer, actionType.containerStyle ]} onPress={ actionType.onPress }>
            {
                (actionType.iconName || actionType.status !== VIDEO_STATUSES.DOWNLOADING) && (
                    <Icon 
                        name={ actionType.iconName }
                        type={ actionType.iconType }
                        size={ 24 }
                        color='#fff'  
                        solid={ actionType.isSolid }
                    />
                )
            }
            {
                // Show Circular Progress on downloading or resuming downloads
                (   actionType.status === VIDEO_STATUSES.DOWNLOADING || 
                    actionType.status === VIDEO_STATUSES.RESUMING_DOWNLOAD
                ) && actionType.circularProgress
            }
            <ListItem.Content>
                    <ListItem.Title style={ [styles.listItemTitle, actionType.titleStyle] }>{ actionType.title }</ListItem.Title>
            </ListItem.Content>
            {
                actionType.iconNameOnEnd && (
                    <TouchableOpacity onPress={ actionType.onPressEndIcon }>
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
        </TouchableOpacity>
    )
}


export default DisplayAction
