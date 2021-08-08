import React, { useState, useEffect } from 'react'
import { ToastAndroid } from 'react-native'
import View from './../../../../components/View';
import VideoPlayer from './../../../../components/VideoPlayer';
import ShowInfo from './ShowInfo';
import ActionButton from './../../home/movie-details-screen/ActionButton';
import TrailerAndMoreLikeThisTab from './TrailerAndMoreLikeThisTab';
import MoreLikeThis from './MoreLikeThis';
import TrailersAndMore from './TrailersAndMore';
import { useDispatch, connect } from 'react-redux';
import * as AUTH_ACTION from './../.././../../redux/modules/auth/actions'
import { Divider } from 'react-native-elements';
import styles from './../../../../assets/stylesheets/trailerInfo';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';

const ListHeader = ({ AUTH_PROFILE, comingSoonMovie }) => 
{
    const dispatch = useDispatch();

    const [ isLoadingAddToMyList, setIsLoadingAddToMyList ] = useState(false);
    const [ isLoadingLikedShows, setIsLoadingLikedShows ] = useState(false);
    const [ selectedTabCategory, setSelectedTabCategory ] = useState(1);

    const handlePressAddToMyList = () => 
    {
        setIsLoadingAddToMyList(true);

        const payload = { 
            id: comingSoonMovie.id, 
            title: comingSoonMovie.title, 
            poster_path: comingSoonMovie.poster_path
        };

        dispatch(AUTH_ACTION.toggleAddToMyListStart(payload));

        setTimeout(() => 
        {
            const movieExists = AUTH_PROFILE.my_list.find(({ id }) => id === comingSoonMovie.id);
            const message = movieExists ? 'Removed from My List' : 'Added to My List';
            
            ToastAndroid.show(message, ToastAndroid.SHORT)
        }, 100);

        setIsLoadingAddToMyList(false);
    }

    const handlePressTabLikeShow = () => {
        setIsLoadingLikedShows(true);
        dispatch(AUTH_ACTION.rateShowStart({ show: comingSoonMovie, rate: 'like' }));
        setIsLoadingLikedShows(false)
    }

    const handlePressTabShare = () => console.log('Shared');

    const handlePressSimilarShow = (recommendedSimilarShow) => navigation.push('TrailerInfo', { comingSoonMovie: recommendedSimilarShow });

    useEffect(() => {
        return () => {
            setIsLoadingAddToMyList(false);
            setIsLoadingLikedShows(false);
            setSelectedTabCategory(1);
        }
    }, []); 

    return (
        <View>
            <VideoPlayer
                shouldPlay={ true }
                shouldToggleVideo={ false }
                videoPath={ comingSoonMovie.video_trailer_path }
                posterPath={ comingSoonMovie.poster_path }
            />
            <ShowInfo comingSoonMovie={ comingSoonMovie } />

            <ActionButton
                movieID={ comingSoonMovie.id }
                isLoadingAddToMyList={ isLoadingAddToMyList }
                isLoadingLikedShows={ isLoadingLikedShows }
                handlePressTabLikeShow={ handlePressTabLikeShow }
                handlePressAddToMyList={ handlePressAddToMyList }
                handlePressTabShare={ handlePressTabShare }
            />

            <Divider style={ styles.divider } />

            <TrailerAndMoreLikeThisTab 
                selectedTabCategory={ selectedTabCategory } 
                setSelectedTabCategory={ setSelectedTabCategory } 
            />

            {
                !selectedTabCategory
                    ? (
                        <MoreLikeThis 
                            comingSoonMovie={ comingSoonMovie }
                            handlePressSimilarShow={ handlePressSimilarShow }
                        />
                    )
                    : <TrailersAndMore trailers={ comingSoonMovie.trailers } />
            }
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ListHeader)
