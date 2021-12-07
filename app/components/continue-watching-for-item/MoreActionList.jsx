import React, { useState, useEffect } from 'react'
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

    const [ rate, setRate ] = useState(getMovieRatingDetails?.rate);

    const handlePressNavigateToShowDetailScreen = () => navigation.navigate('MovieDetailScreen', { 
        id: selectedVideo?.id,
        headerTitle: selectedVideo?.title
    });

    const handlePressLike = () => 
    {
        if (! rate) {
            setRate('like');
            handleToggleLike();
        }

        if (rate === 'like') {
            setRate('');
            handlePressRemoveRate();
        }
    }

    const handlePressDisLike = () => 
    {
        if (! rate) {
            setRate('dislike');
            handleToggleDisLike();
        }

        if (rate === 'dislike') {
            setRate('');
            handlePressRemoveRate();
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
            title: rate ? 'Like' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-up',
            isSolid: (rate === 'like'),
            onPress: () => handlePressLike(),
            show: !rate || (rate === 'like')
        },
        { 
            title: rate ? 'Not For Me' : 'Rated', 
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
                    action.show && <DisplayAction key={ index } isLoading={ AUTH.isLoading } actionType={ action }/> 
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
