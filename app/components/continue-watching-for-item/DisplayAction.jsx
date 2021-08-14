import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import styles from './../../assets/stylesheets/moreActionList';
import VIDEO_STATUSES from './../../config/video.statuses';

const LeftIcon = ({ name, type, isSolid, status }) => 
{
    if (name || status !== VIDEO_STATUSES.DOWNLOADING) {
        return (
            <Icon 
                name={ name } 
                type={ type } 
                size={ 24 } 
                color='#fff' 
                solid={ isSolid } 
            />
        );
    }
    
    return null;
}

const RightIcon = ({ name, type, onPress }) => 
{
    if (name) {
        return (
            <TouchableOpacity onPress={ onPress }>
                <Icon 
                    name={ name }
                    type={ type }
                    size={ 24 }
                    color='#fff'  
                />
            </TouchableOpacity>
        )
    }

    return null;
}

const DisplayAction = ({ isLoading = false, actionType }) => 
{
    return (
        <TouchableOpacity disabled={ isLoading }>
            <ListItem containerStyle={[ styles.listItemContainer, actionType.containerStyle ]} onPress={ actionType.onPress }>
            {
                ( actionType.status === VIDEO_STATUSES.DOWNLOADING || actionType.status === VIDEO_STATUSES.RESUMING_DOWNLOAD) 
                && actionType.circularProgress
            }
            <LeftIcon 
                name={ actionType.iconName }
                type={ actionType.iconType }
                isSolid={ actionType.isSolid }
                status={ actionType.status }
            />
            <ListItem.Content>
                <ListItem.Title style={[ styles.listItemTitle, actionType.titleStyle ]}>{ actionType.title }</ListItem.Title>
            </ListItem.Content>
            <RightIcon 
                name={ actionType.iconNameOnEnd }
                type={ actionType.iconType }
                onPress={ actionType.onPressEndIcon }
            />
            </ListItem>
        </TouchableOpacity>
    )
}


export default DisplayAction
