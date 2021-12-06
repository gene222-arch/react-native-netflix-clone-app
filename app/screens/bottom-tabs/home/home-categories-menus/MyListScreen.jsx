import React, { useState, useEffect } from 'react'
import View from '../../../../components/View';
import styles from './../../../../assets/stylesheets/myList';
import { FlatList, TouchableOpacity } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native'
import ShowInfo from './../../../../components/continue-watching-for-item/Info';
import MyListScreenLoader from '../../../../components/loading-skeletons/MyListScreenLoader';
import { Image } from 'react-native-expo-image-cache';
import MyListScreenEmpty from './../../../../components/empty-data/MyListScreenEmpty';
import { useRoute } from '@react-navigation/native';


const MyListScreen = ({ AUTH_PROFILE }) => 
{
    const { name } = useRoute();
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ show, setShow ] = useState(null);
    const [ shouldDisplayShowInfo, setShouldDisplayShowInfo ] = useState(false);

    const handlePressDisplayShowInfo = (selectedShow) => {
        setShouldDisplayShowInfo(true);
        setShow(selectedShow);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setIsInteractionsComplete(true);
        });

        return () => {
            setIsInteractionsComplete(false);
            setShow(null);
            setShouldDisplayShowInfo(false);
        }
    }, [])

    if (! isInteractionsComplete) return <MyListScreenLoader />

    if (! AUTH_PROFILE.my_lists.length) return <MyListScreenEmpty />

    return (
        <View style={ styles.container }>
            <ShowInfo 
                selectedShow={ show }
                isVisible={ shouldDisplayShowInfo }
                setIsVisible={ setShouldDisplayShowInfo }
                isScreenMyList={ true }
            />
            <FlatList
                keyExtractor={ (item, index) => index.toString() }
                data={ AUTH_PROFILE.my_lists }
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={ () => handlePressDisplayShowInfo(item.movie) }>
                        <Image 
                            preview={{ uri: item.movie.poster_path }}
                            uri={ item.movie.poster_path }
                            style={ styles.image }
                        />
                    </TouchableOpacity>
                )}
                numColumns={ 3 }
                showsHorizontalScrollIndicator={ false }
                showsVerticalScrollIndicator={ false }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(MyListScreen)
