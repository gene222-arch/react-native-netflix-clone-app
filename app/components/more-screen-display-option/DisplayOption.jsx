import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements';
import styles from './../../assets/stylesheets/displayOption';

const DisplayOption = ({ name, onPress, Icon, bottomDivider, }) => 
{
    return (
        <TouchableOpacity onPress={ onPress }>
            <ListItem
                bottomDivider={ bottomDivider } 
                style={ styles.listItemContainer }
                containerStyle={ styles.listItem }
            >
                { Icon && Icon }
                <ListItem.Content>
                    <ListItem.Title style={ styles.listItemTitle }>{ name }</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )
}

export default DisplayOption
