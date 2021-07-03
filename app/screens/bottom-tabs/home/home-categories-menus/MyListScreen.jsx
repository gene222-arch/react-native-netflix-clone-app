import React, { useState, useEffect } from 'react'
import View from '../../../../components/View';
import { Picker } from '@react-native-picker/picker';
import styles from './../../../../assets/stylesheets/myList';
import { FlatList } from 'react-native-gesture-handler';
import MyListItem from './../../../../components/my-list-item/MyListItem';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector, authSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native'
import LoadingScreen from './../../../../components/LoadingScreen';
import { cacheImage, getCachedFile } from './../../../../utils/cacheImage';
import ShowInfo from './../../../../components/continue-watching-for-item/Info';


const DEFAULT_PICKER_LIST = [
    'My List',
    'Pick 2',
    'Pick 3'
];

const MyListScreen = ({ AUTH, AUTH_PROFILE }) => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ selectedPicker, setSelectedPicker ] = useState('My List')
    const [ show, setShow ] = useState(null);
    const [ shouldDisplayShowInfo, setShouldDisplayShowInfo ] = useState(false);

    const handlePressDisplayShowInfo = (show) => {
        setTimeout(() => {
            setShow(show);
            setShouldDisplayShowInfo(true);
        }, 1);
    }

    const handleChangePicker = (value, index) => setSelectedPicker(value);

    const runAfterInteractions = () => {
        AUTH_PROFILE.my_list.map(({ id, poster }) => cacheImage(poster, id, `${ AUTH.credentials.id }/Profiles/${ AUTH_PROFILE.id }/MyList/Posters/`))
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setSelectedPicker('My List');
        setShow(null);
        setShouldDisplayShowInfo(false);
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
            <ShowInfo 
                selectedShow={ show }
                isVisible={ shouldDisplayShowInfo }
                setIsVisible={ setShouldDisplayShowInfo }
            />
            <Picker
                selectedValue={ selectedPicker }
                onValueChange={ handleChangePicker }
                style={ styles.picker }
                dropdownIconColor='white'
            >
            {
                DEFAULT_PICKER_LIST.map((pick, index) => (
                    <Picker.Item 
                        key={ index } 
                        label={ pick } 
                        value={ pick } 
                    />
                ))
            }
            </Picker>
            <FlatList
                keyExtractor={ ({ id }) => id.toString() }
                data={ AUTH_PROFILE.my_list }
                renderItem={ ({ item }) => (
                    <MyListItem 
                        uri={ getCachedFile(`${ AUTH.credentials.id }/Profiles/${ AUTH_PROFILE.id }/MyList/Posters/`, item.id, item.poster) }
                        handlePressDisplayShowInfo={ () => handlePressDisplayShowInfo(item) }
                    />
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
