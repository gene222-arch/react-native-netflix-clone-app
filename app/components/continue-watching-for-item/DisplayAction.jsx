import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import styles from './../../assets/stylesheets/moreActionList';
import { createStructuredSelector } from 'reselect';
import { authSelector } from '../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const DisplayAction = ({ AUTH, actionType }) => 
{
    return (
        <ListItem 
            containerStyle={[ styles.listItemContainer, actionType.containerStyle ]} 
            onPress={ actionType.onPress }
            disabled={ AUTH.isLoading }
        >
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
                <ListItem.Title style={[ styles.listItemTitle, actionType.titleStyle ]}>{ actionType.title }</ListItem.Title>
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
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(DisplayAction)
