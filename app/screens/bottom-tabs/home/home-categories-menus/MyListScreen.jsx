import React, { useState, useEffect } from 'react'
import View from '../../../../components/View';
import styles from './../../../../assets/stylesheets/myList';
import { FlatList } from 'react-native-gesture-handler';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector, authSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native'
import { cacheImage, getCachedFile } from './../../../../utils/cacheImage';
import ShowInfo from './../../../../components/continue-watching-for-item/Info';
import MyListScreenLoader from '../../../../components/loading-skeletons/MyListScreenLoader';

const MyListScreen = ({ AUTH, AUTH_PROFILE }) => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ show, setShow ] = useState(null);
    const [ shouldDisplayShowInfo, setShouldDisplayShowInfo ] = useState(false);

    const handlePressDisplayShowInfo = (show) => {
        setShow(show);
        setShouldDisplayShowInfo(true);
    }

    const runAfterInteractions = () => {
        AUTH_PROFILE.my_list.map(({ id, poster_path }) => {
            cacheImage(poster_path, id, `${ AUTH.auth.id }/Profiles/${ AUTH_PROFILE.id }/MyList/Posters/`)
        })
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            setIsInteractionsComplete(false);
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
                            source={{ 
                                uri: getCachedFile(`${ AUTH.auth.id }/Profiles/${ AUTH_PROFILE.id }/MyList/Posters/`, item.id, item.poster_path) 
                            }}
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
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(MyListScreen)
