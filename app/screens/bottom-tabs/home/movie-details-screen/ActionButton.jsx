import React from 'react'
import { ActivityIndicator, ToastAndroid } from 'react-native'
import View from './../../../../components/View';
import { Tab } from 'react-native-elements';
import styles from './../../../../assets/stylesheets/movieDetail';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStructuredSelector } from 'reselect';
import { ratedShowsSelector, myListSelector, authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const ACTION_TYPES = {
    ADD_TO_MY_LIST: 'ADD TO MY LIST',
    ADD_TO_LIKED_SHOWS: 'ADD TO LIKED SHOWS',
    SHARE_SHOW: 'SHARE SHOW'
}

const TabIcon = ({ actionName, data, showID, isLoading }) => 
{
    switch (actionName) 
    {
        case ACTION_TYPES.ADD_TO_MY_LIST:

            if (isLoading) {
                return <ActivityIndicator color='#fff' />
            } 
        
            return (
                <MaterialCommunityIcon 
                    name={ data.findIndex(({ id }) => id === showID) !== -1 ? 'check' : 'plus' }
                    size={ 30 }
                    color='white'
                />
            )

        case ACTION_TYPES.ADD_TO_LIKED_SHOWS:

            if (isLoading) {
                return <ActivityIndicator color='#fff' />
            } 

            return (
                <FontAwesome5 
                    name='thumbs-up'
                    size={ 30 }
                    color='white'
                    solid={ data.findIndex(({ id }) => id === showID) !== -1 }
                />
            )

        case ACTION_TYPES.SHARE_SHOW:

            if (isLoading) {
                return <ActivityIndicator color='#fff' />
            } 

            return (
                <FeatherIcon 
                    name='share-2'
                    size={ 30 }
                    color='white'
                />
            )
    }
}

const ActionButton = ({ 
    AUTH_PROFILE,
    selectedShowID, 
    isLoadingAddToMyList, 
    handlePressTabAddToLIst, 
    isLoadingLikedShows, 
    handlePressTabLikeShow, 
    handlePressTabShare
}) => 
{

    const myListIcon = () => {
        return (
            isLoadingAddToMyList 
                ? <ActivityIndicator color='#fff' />
                : (
                    <TabIcon 
                        actionName={ ACTION_TYPES.ADD_TO_MY_LIST } 
                        data={ AUTH_PROFILE.my_list } 
                        showID={ selectedShowID }
                    />
                )
        )
    }

    const likeShowIcon = () => {
        return (
            isLoadingLikedShows 
                ? <ActivityIndicator color='#fff' />
                : (
                    <TabIcon 
                        actionName={ ACTION_TYPES.ADD_TO_LIKED_SHOWS } 
                        data={ AUTH_PROFILE.liked_shows } 
                        showID={ selectedShowID }
                    /> 
                )
        )
    }

    const handlePressTabAddToLIst_ = () => 
    {
        handlePressTabAddToLIst();

        const hasAddedToList = AUTH_PROFILE.my_list.findIndex(({ id }) => id === selectedShowID) !== -1;
        const message = hasAddedToList ? 'Removed from My List' : 'Added to My List';
        setTimeout(() => {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }, 100);
    }

    return (
        <View style={ styles.tabsContainer }>
            <Tab value={ 0 } indicatorStyle={ styles.tabIndicator } disableIndicator={ true }>
                <Tab.Item 
                    title='My List' 
                    icon={ myListIcon() }
                    titleStyle={ styles.tabItemTitle  }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressTabAddToLIst_ }
                />
                <Tab.Item 
                    title='Like' 
                    icon={ likeShowIcon() }
                    titleStyle={ styles.tabItemTitle }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressTabLikeShow }
                />
                <Tab.Item 
                    title='Share' 
                    icon={ 
                        <TabIcon 
                            actionName={ ACTION_TYPES.SHARE_SHOW }
                            showID={ selectedShowID }
                        /> 
                    }
                    titleStyle={ styles.tabItemTitle }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressTabShare }
                />
            </Tab>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    MY_LIST: myListSelector,
    LIKED_SHOWS: ratedShowsSelector
});

export default connect(mapStateToProps)(ActionButton)
