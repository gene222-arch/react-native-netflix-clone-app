import React from 'react'
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

    const handlePressNavigateToShowDetailScreen = () => navigation.navigate('MovieDetailScreen', { 
        id: selectedVideo?.id,
        headerTitle: selectedVideo?.title
    });

    const actionList = 
    [
        {
            title: selectedVideo.title,
            iconType: 'feather',
            iconNameOnEnd: 'x-circle',
            show: true,
            onPressEndIcon: () => setIsVisible(false),
            titleStyle: styles.moreActionHeader,
            containerStyle: styles.moreActionHeaderContainer,
        },
        { 
            title: 'Episodes and Info', 
            iconType: 'feather',
            iconName: 'info',
            onPress: () => handlePressNavigateToShowDetailScreen(),
            show: true,
        },
        { 
            title: !getMovieRatingDetails?.rate ? 'Like' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-up',
            isSolid: getMovieRatingDetails?.rate === 'like',
            onPress: () => !getMovieRatingDetails?.rate ? handleToggleLike() : handlePressRemoveRate(),
            show: !getMovieRatingDetails?.rate || getMovieRatingDetails?.rate === 'like',
        },
        { 
            title: !getMovieRatingDetails?.rate ? 'Not For Me' : 'Rated', 
            iconType: 'font-awesome-5',
            iconName: 'thumbs-down',
            isSolid: getMovieRatingDetails?.rate === 'dislike',
            onPress: () => !getMovieRatingDetails?.rate ? handleToggleDisLike() : handlePressRemoveRate(),
            show: !getMovieRatingDetails?.rate || getMovieRatingDetails?.rate === 'dislike',
        },
        {
            title: !AUTH.isLoading ? 'Remove From Row' : 'Removing from row...',
            iconType: 'font-awesome-5',
            iconName: 'ban',
            onPress: () => handlePressRemove(),
            show: true,
        },
    ];

    return (
        <View style={ styles.container }>

            { isVisible && <StatusBar backgroundColor='rgba(0, 0, 0, .7)' /> }

            <BottomSheet isVisible={ isVisible } containerStyle={ styles.bottomSheetContainer }>
            {
                actionList.map((action, index) => action.show && <DisplayAction key={ index } isLoading={ AUTH.isLoading } actionType={ action }/> )
            }
            </BottomSheet>
        </View>
    )
}


const mapStateToProps = createStructuredSelector({
    AUTH: authProfileSelector
});

export default connect(mapStateToProps)(MoreActionList)
