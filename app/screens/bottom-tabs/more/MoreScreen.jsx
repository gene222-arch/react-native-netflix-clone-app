import React, { useState, useEffect } from 'react'
import { useDispatch, connect, batch } from 'react-redux'
import { InteractionManager, FlatList, TouchableOpacity } from 'react-native'
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'
import * as TOAST_ACTION from '../../../redux/modules/toast/actions'
import styles from './../../../assets/stylesheets/moreScreen';
import ProfilePhotoItem from '../../../components/profile-photo-item/ProfilePhotoItem';
import View from './../../../components/View';
import { Overlay, Button } from 'react-native-elements';
import Text from './../../../components/Text';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoadingScreen from './../../../components/LoadingScreen';
import { createStructuredSelector } from 'reselect';
import { authSelector, authProfileSelector } from './../../../redux/modules/auth/selectors';
import { useNavigation } from '@react-navigation/native';
import DisplayOption from './../../../components/more-screen-display-option/DisplayOption';
import LoadingSpinner from '../../../components/LoadingSpinner'
import Echo from './../../../utils/echo'


const moreOptions = ({ onPressSignOut, onPressMyList }) =>
[
    {
        id: 1,
        name: 'My List',
        Icon: <FontAwesome5 name='check' size={ 15 } color={ styles.manageProfilesBtnIcon.color }/>,
        bottomDivider: true,
        onPress: () => onPressMyList()
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
        onPress: () => onPressSignOut()
    }
];

const MoreScreen = ({ AUTH, AUTH_PROFILE }) => 
{
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ sortedProfiles, setSortedProfiles ] = useState([]);
    const [ showSignOutDialog, setShowSignOutDialog ] = useState(false);

    const handlePressSelectProfile = (id) => dispatch(AUTH_ACTION.selectProfileStart({ id }))

    const toggleSignOutDialog = () => setShowSignOutDialog(!showSignOutDialog);

    const handlePressSignOut = async () => {
        batch(() => {
            dispatch(TOAST_ACTION.createToastMessageStart({
                message: 'Signing Out',
                toastAndroid: 'SHORT',
            }));
            dispatch(AUTH_ACTION.logoutStart());
        });

        (await Echo()).disconnect();
    }

    const handlePressMyList = () => navigation.navigate('MyListScreen', { headerTitle: 'My List' });

    const moreOptions_ = { 
        onPressSignOut: toggleSignOutDialog, 
        onPressMyList: handlePressMyList 
    };

    /** Run after interactions */
    const runAfterInteractions = () => 
    {
        const selectedProfileIndex = AUTH.profiles.findIndex(({ id }) => id === AUTH_PROFILE.id);
        const middleArrValIndex = Math.floor(AUTH.profiles.length / 2);
        const profiles = AUTH.profiles;

        [ profiles[selectedProfileIndex], profiles[middleArrValIndex] ] = [ profiles[middleArrValIndex], profiles[selectedProfileIndex] ];

        setSortedProfiles(profiles);

        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setSortedProfiles([]);
        setShowSignOutDialog(false);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            cleanUp();
        }
    }, [AUTH_PROFILE]); 

    if (!isInteractionsComplete) {
        return <LoadingScreen />
    }

    return (
        <View style={ styles.container }>
            <LoadingSpinner isLoading={ AUTH.isLoading } />
            {/* Sign out Dialog */}
            <Overlay isVisible={ showSignOutDialog } onBackdropPress={ toggleSignOutDialog } overlayStyle={ styles.signOutDialog }>
                <Text style={ styles.signOutQuery }>Sign out from this account?</Text>
                <View style={ styles.signOutDialogActionBtns }>
                    <TouchableOpacity onPress={ toggleSignOutDialog } disabled={ AUTH.isLoading } >
                        <Text style={ styles.cancelSignOut }>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ handlePressSignOut } disabled={ AUTH.isLoading }>
                        <Text style={ styles.signOut }>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            
            {/* Profiles */}
            <View style={ styles.profileContainer }>
                <FlatList
                    keyExtractor={ item => item?.id.toString() }
                    data={ sortedProfiles }
                    renderItem={ ({ item, index }) => (
                        <ProfilePhotoItem 
                            key={ index }
                            profile={ item }
                            isSelected={ AUTH_PROFILE.id === item.id }
                            onPress={ () => handlePressSelectProfile(item.id) }
                        />
                    )}
                    horizontal
                    contentContainerStyle={ styles.profileContainerContent }
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
                    onPress={ () => navigation.navigate('SelectProfile') }
                />
            </View>
            
            <View style={ styles.lists }>
                {
                    moreOptions(moreOptions_)
                        .map(({ id, name, Icon, bottomDivider, onPress }) => (
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
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(MoreScreen)