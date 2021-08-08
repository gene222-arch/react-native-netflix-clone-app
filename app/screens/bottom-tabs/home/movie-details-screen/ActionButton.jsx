import React from 'react'
import { ActivityIndicator, ToastAndroid } from 'react-native'
import View from './../../../../components/View';
import { Tab } from 'react-native-elements';
import styles from './../../../../assets/stylesheets/movieDetail';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const ShareIcon = ({ isLoading = false }) => 
{
    if (isLoading) {
        return <ActivityIndicator color='#FFF' /> 
    }

    return (
        <FeatherIcon 
            name='share-2'
            size={ 30 }
            color='white'
        />
    )
}

const LikeIcon = ({ isLoading, likedMovies, movieID }) => 
{
    if (isLoading) {
        return <ActivityIndicator color='#fff' />
    }

    return (
        <FontAwesome5 
            name='thumbs-up'
            size={ 30 }
            color='white'
            solid={ likedMovies.find(({ id }) => id === movieID) }
        />
    )
}

const PlusIcon = ({ isLoading, myList, movieID }) => 
{
    if (isLoading) {
        return <ActivityIndicator color='#fff' />   
    }

    return (
        <MaterialCommunityIcon 
            name={ myList.find(({ id }) => id === movieID) ? 'check' : 'plus' }
            size={ 30 }
            color='white'
        />
    )
}

const ActionButton = ({ 
    AUTH_PROFILE,
    movieID, 
    isLoadingAddToMyList, 
    isLoadingLike, 
    handlePressAddToMyList, 
    handlePressLike, 
    handlePressTabShare
}) => 
{
    console.log(movieID);
    
    return (
        <View style={ styles.tabsContainer }>
            <Tab value={ 0 } indicatorStyle={ styles.tabIndicator } disableIndicator={ true }>
                <Tab.Item 
                    title='My List' 
                    icon={ <PlusIcon isLoading={ isLoadingAddToMyList } myList={ AUTH_PROFILE.my_list } movieID={ movieID } /> }
                    titleStyle={ styles.tabItemTitle  }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressAddToMyList }
                />
                <Tab.Item 
                    title='Like' 
                    icon={ <LikeIcon isLoading={ isLoadingLike } likedMovies={ AUTH_PROFILE.liked_shows } movieID={ movieID } /> }
                    titleStyle={ styles.tabItemTitle }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressLike }
                />
                <Tab.Item 
                    title='Share' 
                    icon={ <ShareIcon /> 
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
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ActionButton)
