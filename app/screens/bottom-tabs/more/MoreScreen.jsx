import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { InteractionManager, FlatList } from 'react-native'
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'
import styles from './../../../assets/stylesheets/moreScreen';
import accountProfilesAPI from './../../../services/data/accountProfiles';
import ProfilePhotoItem from '../../../components/profile-photo-item/ProfilePhotoItem';
import View from './../../../components/View';
import { Avatar, Button, ListItem } from 'react-native-elements';
import Text from './../../../components/Text';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoadingScreen from './../../../components/LoadingScreen';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../redux/modules/auth/selectors';

const moreOptions = (logoutHandler) =>
[
    {
        id: 1,
        name: 'My List',
        Icon: <FontAwesome5 name='check' size={ 15 } color={ styles.manageProfilesBtnIcon.color }/>,
        bottomDivider: true,
        onPress: () => console.log('Clicked')
    },
    {
        id: 2,
        name: 'App Settings',
        Icon: null,
        bottomDivider: false,
        onPress: () => console.log('Clicked')
    },
    {
        id: 3,
        name: 'Account',
        Icon: null,
        bottomDivider: false,
        onPress: () => console.log('Clicked')
    },
    {
        id: 4,
        name: 'Help',
        Icon: null,
        bottomDivider: false,
        onPress: () => console.log('Clicked')
    },
    {
        id: 5,
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

const MoreScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();
    
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ selectedImg, setSelectedImg ] = useState(1);
    const [ sortedProfiles, setSortedProfiles ] = useState([]);

    const sortProfile = () => {
        const selectedProfileIndex = AUTH.profiles.findIndex(({ id }) => id === AUTH.profile.id);
        const middleArrValIndex = Math.floor(AUTH.profiles.length / 2);
        const profiles = AUTH.profiles;
        [ profiles[selectedProfileIndex] ] = [ profiles[middleArrValIndex] ];

        setSortedProfiles(profiles);
    }

    const logout = () => dispatch(AUTH_ACTION.logoutStart());

    const runAfterInteractions = () => {
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setSortedProfiles([]);
        setSelectedImg(1);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);
        sortProfile();
        return () => {
            cleanUp();
        }
    }, []); 

    if (!isInteractionsComplete) {
        return <LoadingScreen />
    }

    return (
        <View style={ styles.container }>
            {/* Profiles */}
            <View style={ styles.profileContainer }>
                <FlatList 
                    keyExtractor={ ({ id }) => id.toString() }
                    data={ sortedProfiles }
                    renderItem={ ({ item, index }) => (
                        <ProfilePhotoItem 
                            key={ index }
                            name={ item.name } 
                            uri={ item.profile_photo }
                            isSelected={ AUTH.profile.id === item.id }
                            onPress={ () => setSelectedImg(item.id) }
                        />
                    )}
                    horizontal
                />
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

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(MoreScreen)