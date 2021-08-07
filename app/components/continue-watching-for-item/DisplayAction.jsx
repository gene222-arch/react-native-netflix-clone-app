import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import styles from './../../assets/stylesheets/moreActionList';
import VIDEO_STATUSES from './../../config/video.statuses';


const DisplayAction = ({ actionType }) => 
{
    const { title, iconName, iconType, status, isSolid } = actionType;


    return (
        <TouchableOpacity>
            <ListItem containerStyle={[ styles.listItemContainer, actionType.containerStyle ]} onPress={ actionType.onPress }>
            {
                (iconName || status !== VIDEO_STATUSES.DOWNLOADING) 
                && <Icon name={ iconName } type={ iconType } size={ 24 } color='#fff' solid={ isSolid } />
            }
            {
                // Show Circular Progress on downloading or resuming downloads
                ( status === VIDEO_STATUSES.DOWNLOADING || status === VIDEO_STATUSES.RESUMING_DOWNLOAD) 
                && actionType.circularProgress
            }
            <ListItem.Content>
                <ListItem.Title style={[ styles.listItemTitle, actionType.titleStyle ]}>{ title }</ListItem.Title>
            </ListItem.Content>
            {
                actionType.iconNameOnEnd && (
                    <TouchableOpacity onPress={ actionType.onPressEndIcon }>
                        <Icon 
                            name={ actionType.iconNameOnEnd }
                            type={ iconType }
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
