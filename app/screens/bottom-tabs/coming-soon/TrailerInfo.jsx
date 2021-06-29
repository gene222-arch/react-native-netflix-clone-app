import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { InteractionManager, FlatList } from 'react-native'
import { Divider } from 'react-native-elements'

/** Actions */
import * as AUTH_ACTION from './../../../redux/modules/auth/actions';

/** Selectors */
import { comingSoonSelector } from './../../../redux/modules/coming-soon/selectors';
import { authSelector } from './../../../redux/modules/auth/selectors';

/** Components */
import View from './../../../components/View';
import VideoPlayer from '../../../components/VideoPlayer';
import ActionButton from './../home/movie-details-screen/ActionButton';
import LoadingScreen from './../../../components/LoadingScreen';

/** Styles */
import styles from './../../../assets/stylesheets/trailerInfo';
import MoreLikeThis from './trailer-info-components/MoreLikeThis';
import TrailersAndMore from './trailer-info-components/TrailersAndMore';
import ShowInfo from './trailer-info-components/ShowInfo';
import TrailerAndMoreLikeThisTab from './trailer-info-components/TrailerAndMoreLikeThisTab';
import { useNavigation } from '@react-navigation/native';


const TrailerInfo = ({ AUTH, COMING_SOON, route, navigation }) => 
{
    const dispatch = useDispatch();
    const { comingSoonShow } = route.params;

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ isLoadingAddToMyList, setIsLoadingAddToMyList ] = useState(false);
    const [ isLoadingLikedShows, setIsLoadingLikedShows ] = useState(false);
    const [ selectedTab, setSelectedTab ] = useState(0);
    const [ selectedTabCategory, setSelectedTabCategory ] = useState(1);

    
    const handlePressTabAddToLIst = () => 
    {
        setIsLoadingAddToMyList(true);
        setSelectedTab(0);
        
        dispatch(AUTH_ACTION.toggleAddToMyListStart({ 
            id: comingSoonShow.id, 
            title: comingSoonShow.title, 
            poster: comingSoonShow.poster 
        }));

        setTimeout(() => setIsLoadingAddToMyList(false), 1);
    }

    const handlePressTabLikeShow = () => 
    {
        setIsLoadingLikedShows(true);
        setSelectedTab(1);
        dispatch(AUTH_ACTION.rateShowStart({ show: comingSoonShow, rate: 'like' }));
        setTimeout(() => setIsLoadingLikedShows(false), 1);
    }

    const handlePressTabShare = () => {
        setSelectedTab(2);
        console.log('Shared');
    }

    const handlePressSimilarShow = (recommendedSimilarShow) => {
        navigation.push('TrailerInfo', { comingSoonShow: recommendedSimilarShow });
    }

    const runAfterInteractions = () => {
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setIsLoadingAddToMyList(false);
        setIsLoadingLikedShows(false);
        setSelectedTab(0);
        setSelectedTabCategory(1);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            cleanUp();
        }
    }, []);


    if (!isInteractionsComplete) {
        return <LoadingScreen />
    }

    return (
        <View style={ styles.container }>
            <FlatList 
                data={ [] }
                ListHeaderComponent={
                    <>
                        <VideoPlayer 
                            episode={ comingSoonShow }
                            shouldPlay={ true }
                            shouldToggleVideo={ false }
                        />

                        {/* Trailer Info */}
                        <ShowInfo comingSoonShow={ comingSoonShow } />

                        {/* Tab */}
                        <ActionButton 
                            selectedTab={ selectedTab }
                            selectedShowID={ comingSoonShow.id }
                            isLoadingAddToMyList={ isLoadingAddToMyList }
                            isLoadingLikedShows={ isLoadingLikedShows }
                            handlePressTabLikeShow={ handlePressTabLikeShow }
                            handlePressTabAddToLIst={ handlePressTabAddToLIst }
                            handlePressTabShare={ handlePressTabShare }
                            disableIndicator={ true }
                        />

                        <Divider style={ styles.divider } />

                        <TrailerAndMoreLikeThisTab selectedTabCategory={ selectedTabCategory } setSelectedTabCategory={ setSelectedTabCategory } />
                        
                        {selectedTabCategory === 0 && (
                            <MoreLikeThis 
                                currentComingSoonShow={ comingSoonShow }
                                comingSoonShows={ COMING_SOON.comingSoonShows }
                                handlePressSimilarShow={ handlePressSimilarShow }
                            />
                        )}

                        { selectedTabCategory === 1 && <TrailersAndMore trailers={ comingSoonShow.coming_soon_shows_trailers } /> }
                    </>
                }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    COMING_SOON: comingSoonSelector
});

export default connect(mapStateToProps)(TrailerInfo)
