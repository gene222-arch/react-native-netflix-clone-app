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
import { cacheImage, getCachedFile } from './../../../../utils/cacheImage';
import ShowInfo from './../../../../components/continue-watching-for-item/Info';
import LoadingSpinner from './../../../../components/LoadingSpinner';


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
        setShow(show);
        setShouldDisplayShowInfo(true);
    }

    const handleChangePicker = (value, index) => setSelectedPicker(value);

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
            setSelectedPicker('My List');
            setShow(null);
            setShouldDisplayShowInfo(false);
        }
    }, []);

    if (! isInteractionsComplete) {
        return <LoadingSpinner />
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
                keyExtractor={ (item, index) => index.toString() }
                data={ AUTH_PROFILE.my_list }
                renderItem={ ({ item }) => (
                    <MyListItem 
                        uri={ getCachedFile(`${ AUTH.auth.id }/Profiles/${ AUTH_PROFILE.id }/MyList/Posters/`, item.id, item.poster_path) }
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
