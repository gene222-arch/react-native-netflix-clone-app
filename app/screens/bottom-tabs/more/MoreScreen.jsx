import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { InteractionManager } from 'react-native'
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'
import styles from './../../../assets/stylesheets/moreScreen';
import accountsAPI from './../../../services/data/accounts';
import ProfilePhotoItem from '../../../components/profile-photo-item/ProfilePhotoItem';
import View from './../../../components/View';
import { Avatar, Button, ListItem } from 'react-native-elements';
import Text from './../../../components/Text';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const moreOptions = (logoutHandler) =>
[
    {
        id: 1,
        name: 'Notifications',
        Icon: <FontAwesome5 name='bell' size={ 15 } color={ styles.manageProfilesBtnIcon.color }/>,
        bottomDivider: true,
        onPress: () => console.log('Clicked')
    },
    {
        id: 2,
        name: 'Notifications',
        Icon: <FontAwesome5 name='check' size={ 15 } color={ styles.manageProfilesBtnIcon.color }/>,
        bottomDivider: true,
        onPress: () => console.log('Clicked')
    },
    {
        id: 3,
        name: 'App Settings',
        Icon: null,
        bottomDivider: false,
        onPress: () => console.log('Clicked')
    },
    {
        id: 4,
        name: 'Account',
        Icon: null,
        bottomDivider: false,
        onPress: () => console.log('Clicked')
    },
    {
        id: 5,
        name: 'Help',
        Icon: null,
        bottomDivider: false,
        onPress: () => console.log('Clicked')
    },
    {
        id: 6,
        name: 'Sign Out',
        Icon: null,
        bottomDivider: false,
        onPress: () => logoutHandler()
    }
];

const DisplayOption = ({ onPress, bottomDivider, Icon, name }) => 
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

const MoreScreen = () => 
{
    const dispatch = useDispatch();
    
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ accounts, setAccounts ] = useState([]);
    const [ selectedImg, setSelectedImg ] = useState(1);

    const logout = () => dispatch(AUTH_ACTION.logoutStart());

    const runAfterInteractions = () => {
        setAccounts(accountsAPI);
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setAccounts([]);
        setSelectedImg(1);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            cleanUp();
        }
    }, []); 

    if (!isInteractionsComplete) {
        return <Text>Loading ...</Text>
    }

    return (
        <View style={ styles.container }>
            {/* Profiles */}
            <View style={ styles.profileContainer }>
            {
                accounts.map(({ id, name, profile_photo }) => (
                    <ProfilePhotoItem 
                        key={ id }
                        name={ name } 
                        uri={ profile_photo }
                        isSelected={ selectedImg === id }
                        onPress={ () => setSelectedImg(id) }
                    />
                ))
            }
                <TouchableOpacity>
                    <Avatar
                        size='large'
                        title='+'
                        onPress={() => console.log('Works!')}
                        activeOpacity={0.7}
                        avatarStyle={ styles.addMoreProfile }
                    />
                    <Text style={ styles.addProfileText }>Add Profile</Text>
                </TouchableOpacity>
            </View>
            
            {/* Manage Profiles Btn */}
            <View style={ styles.manageProfilesContainer }>
                <Button
                    type='clear'
                    icon={
                        <FontAwesome5
                            name='pen'
                            size={15}
                            color={ styles.manageProfilesBtnIcon.color }
                        />
                    }
                    title='   Manage Profiles'
                    titleStyle={ styles.manageProfilesBtnTitle }
                />
            </View>
            <View style={ styles.lists }>
                {
                    moreOptions(logout).map(({ id, name, Icon, bottomDivider, onPress }) => (
                        <DisplayOption 
                            key={ id }
                            onPress={ onPress }
                            name={ name }
                            Icon={ Icon }
                            bottomDivider={ bottomDivider }
                        />
                    ))
                }
            </View>
        </View>
    )
}

export default MoreScreen