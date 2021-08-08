import React, { useState, useEffect } from 'react'
import View from './../../../../components/View';
import VideoPlayer from './../../../../components/VideoPlayer';
import ShowInfo from './ShowInfo';
import ActionButton from './../../home/movie-details-screen/ActionButton';
import TrailerAndMoreLikeThisTab from './TrailerAndMoreLikeThisTab';
import MoreLikeThis from './MoreLikeThis';
import TrailersAndMore from './TrailersAndMore';
import { useDispatch } from 'react-redux';
import * as AUTH_ACTION from './../.././../../redux/modules/auth/actions'
import { Divider } from 'react-native-elements';
import styles from './../../../../assets/stylesheets/trailerInfo';

const ListHeader = ({ comingSoonMovie }) => 
{
    const dispatch = useDispatch();

    const [ isLoadingAddToMyList, setIsLoadingAddToMyList ] = useState(false);
    const [ isLoadingLikedShows, setIsLoadingLikedShows ] = useState(false);
    const [ selectedTabCategory, setSelectedTabCategory ] = useState(1);

    const handlePressTabAddToLIst = () => 
    {
        setIsLoadingAddToMyList(true);
        dispatch(AUTH_ACTION.toggleAddToMyListStart({ 
            id: comingSoonMovie.id, 
            title: comingSoonMovie.title, 
            poster: comingSoonMovie.poster 
        }));
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
                selectedShowID={ comingSoonMovie.id }
                isLoadingAddToMyList={ isLoadingAddToMyList }
                isLoadingLikedShows={ isLoadingLikedShows }
                handlePressTabLikeShow={ handlePressTabLikeShow }
                handlePressTabAddToLIst={ handlePressTabAddToLIst }
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

export default ListHeader
