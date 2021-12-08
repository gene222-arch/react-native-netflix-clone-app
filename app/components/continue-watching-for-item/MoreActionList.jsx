import React, { useState, useEffect } from 'react'
import { ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-elements';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StatusBar } from 'expo-status-bar'
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import styles from './../../assets/stylesheets/moreActionList';
import DisplayAction from './DisplayAction';
import View from './../View';

const MoreActionList = ({ AUTH, selectedVideo, handlePressRemove, handleToggleLike, handleToggleDisLike, handlePressRemoveRate, isVisible, setIsVisible }) => 
{
    const navigation = useNavigation();
    const getMovieRatingDetails = selectedVideo.user_ratings[0];

    const [ rate, setRate ] = useState('');

    const handlePressNavigateToShowDetailScreen = () => navigation.navigate('MovieDetailScreen', { 
        id: selectedVideo?.id,
        headerTitle: selectedVideo?.title
    });

    const handlePressLike = () => 
    {
        if (! rate) {
            setRate('like');
            setTimeout(() => {
                handleToggleLike();
            }, 0);
        }

        if (rate === 'like') {
            setRate('');
            setTimeout(() => {
                handlePressRemoveRate();
            }, 0);
        }
    }

    const handlePressDisLike = () => 
    {
        if (! rate) {
            setRate('dislike');
            setTimeout(() => {
                handleToggleDisLike();
            }, 0);
        }

        if (rate === 'dislike') {
            setRate('');
            setTimeout(() => {
                handlePressRemoveRate();
            }, 0);
        }
    }

    const actionList = 
    [
        {
            title: selectedVideo.title,
            iconType: 'feather',
            iconNameOnEnd: 'x-circle',
            show: true,
            onPressEndIcon: () => setIsVisible(false),
            titleStyle: styles.moreActionHeader,
            containerStyle: styles.moreActionHeaderContainer
        },
        { 
            title: 'Similar Movies and Info', 
            iconType: 'feather',
            iconName: 'info',
            onPress: () => handlePressNavigateToShowDetailScreen(),
            show: true
        },
        { 
            title: rate !== 'like' ? 'Like' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-up',
            isSolid: (rate === 'like'),
            onPress: () => handlePressLike(),
            show: !rate || (rate === 'like')
        },
        { 
            title: rate !== 'dislike' ? 'Not For Me' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-down',
            isSolid: (rate === 'dislike'),
            onPress: () => handlePressDisLike(),
            show: !rate || (rate === 'dislike')
        },
        {
            title: !AUTH.isLoading ? 'Remove From Row' : 'Removing from row...',
            iconType: 'font-awesome-5',
            iconName: 'ban',
            onPress: () => handlePressRemove(),
            show: true
        },
    ];

    useEffect(() => 
    {
        setRate(getMovieRatingDetails?.rate);
        return () => {
            setRate('');
        }
    }, []);

    return (
        <View style={ styles.container }>
            { isVisible && <StatusBar backgroundColor='rgba(0, 0, 0, .7)' /> }
            <BottomSheet 
                isVisible={ isVisible } 
                containerStyle={ styles.bottomSheetContainer }
                modalProps={{ onRequestClose: () => { setIsVisible(false)}}}
            >
            {
                actionList.map((action, index) => (
                    action.show && <DisplayAction key={ index } actionType={ action }/> 
                ))
            }
            </BottomSheet>
        </View>
    )
}


const mapStateToProps = createStructuredSelector({
    AUTH: authProfileSelector
});

export default connect(mapStateToProps)(MoreActionList)
