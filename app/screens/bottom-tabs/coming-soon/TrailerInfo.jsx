import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { InteractionManager, FlatList } from 'react-native'
import { Tab, Divider } from 'react-native-elements'

/** Actions */
import * as AUTH_ACTION from './../../../redux/modules/auth/actions';

/** Selectors */
import { comingSoonSelector } from './../../../redux/modules/coming-soon/selectors';
import { authSelector } from './../../../redux/modules/auth/selectors';

/** Components */
import View from './../../../components/View';
import Text from './../../../components/Text';
import VideoPlayer from '../../../components/VideoPlayer';
import Image from './../../../components/Image';
import ActionButton from './../home/movie-details-screen/ActionButton';
import LoadingScreen from './../../../components/LoadingScreen';

/** Styles */
import styles from './../../../assets/stylesheets/trailerInfo';


const TrailerInfo = ({ AUTH, COMING_SOON, route }) => 
{
    const { comingSoonShow } = route.params;
    const dispatch = useDispatch();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ isLoadingAddToMyList, setIsLoadingAddToMyList ] = useState(false);
    const [ isLoadingLikedShows, setIsLoadingLikedShows ] = useState(false);
    const [ selectedTab, setSelectedTab ] = useState(0);
    const [ selectedTabCategory, setSelectedTabCategory ] = useState(0);

    
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

    const runAfterInteractions = () => {
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setIsLoadingAddToMyList(false);
        setIsLoadingLikedShows(false);
        setSelectedTab(0);
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
                        <View style={ styles.trailerInfo }>
                            <Image 
                                source={{
                                    uri: comingSoonShow.title_logo
                                }}
                                style={ styles.trailerTitleLogo }
                            />
                            <View style={ styles.yearDuration }>
                                <Text style={ styles.yearDurationText }>{ comingSoonShow.year }</Text>
                                <Text style={ styles.ageRestrictionText }>{ comingSoonShow.age_restriction }+</Text>
                                <Text style={ styles.yearDurationText }>{ comingSoonShow.duration }</Text>
                            </View>
                            <Text h4 style={ styles.additionalTrailerText }>{ comingSoonShow.additional_trailer }</Text>
                            <Text style={ styles.plotText }>{ comingSoonShow.plot }</Text>
                            <View style={ styles.starringDirectorContainer }>
                                <Text style={ styles.starredArtistsText }><Text style={ styles.starringDesc }>Starring:</Text> { comingSoonShow.starred_artists }</Text>
                                <Text style={ styles.directorText }><Text style={ styles.directorDesc }>Director:</Text> { comingSoonShow.director }</Text>
                            </View>
                        </View>

                        {/* Tab */}
                        <ActionButton 
                            selectedTab={ selectedTab }
                            selectedShowID={ comingSoonShow }
                            isLoadingAddToMyList={ isLoadingAddToMyList }
                            isLoadingLikedShows={ isLoadingLikedShows }
                            handlePressTabLikeShow={ handlePressTabLikeShow }
                            handlePressTabAddToLIst={ handlePressTabAddToLIst }
                            handlePressTabShare={ handlePressTabShare }
                            disableIndicator={ true }
                        />
                        <Divider style={ styles.divider } />
                        <View style={ styles.tabCategoryContainer }>
                            <Tab value={ selectedTabCategory } indicatorStyle={ styles.tabIndicator }>
                                <Tab.Item 
                                    title={ <Text style={ selectedTabCategory === 0 ? styles.tabCategoryTitleSelected : styles.tabCategoryTitle }>MORE LIKE THIS</Text> } 
                                    onPressIn={ () => setSelectedTabCategory(0) } 
                                    titleStyle={ styles.tabTitle }
                                    containerStyle={ styles.tabItemContainer }
                                />
                                <Tab.Item 
                                    title={ <Text style={ selectedTabCategory === 1 ? styles.tabCategoryTitleSelected : styles.tabCategoryTitle }>TRAILERS & MORE</Text> } 
                                    onPressIn={ () => setSelectedTabCategory(1) } 
                                    titleStyle={ styles.tabTitle }
                                    containerStyle={ styles.tabItemContainer }
                                />
                            </Tab>
                        </View>
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
