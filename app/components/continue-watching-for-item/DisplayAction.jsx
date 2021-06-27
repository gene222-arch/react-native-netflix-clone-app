import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import styles from './../../assets/stylesheets/moreActionList';

const DisplayAction = ({ actionType }) => 
{
    return (
        <TouchableOpacity onPress={ actionType.onPress }>
            <ListItem containerStyle={[ styles.listItemContainer, actionType.containerStyle ]} onPress={ actionType.onPress }>
            {
                (actionType.iconName && actionType.status !== 'Downloading') && (
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
                actionType.status === 'Downloading' && actionType.circularProgress
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
