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


const MyListScreen = ({ AUTH_PROFILE }) => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ show, setShow ] = useState(null);
    const [ shouldDisplayShowInfo, setShouldDisplayShowInfo ] = useState(false);

    const handlePressDisplayShowInfo = (show) => {
        setShow(show);
        setShouldDisplayShowInfo(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setIsInteractionsComplete(true);
        });

        return () => {
            setShow(null);
            setShouldDisplayShowInfo(false);
        }
    }, []);

    if (! isInteractionsComplete) {
        return <MyListScreenLoader />
    }

    return (
        <View style={ styles.container }>
            <ShowInfo 
                selectedShow={ show }
                isVisible={ shouldDisplayShowInfo }
                setIsVisible={ setShouldDisplayShowInfo }
            />
            <FlatList
                keyExtractor={ (item, index) => index.toString() }
                data={ AUTH_PROFILE.my_list }
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={ () => handlePressDisplayShowInfo(item) }>
                        <Image 
                            preview={ item.poster_path }
                            uri={ item.poster_path }
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
