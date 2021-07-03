import React, { useState, useEffect } from 'react'
import View from '../../../../components/View';
import { Picker } from '@react-native-picker/picker';
import styles from './../../../../assets/stylesheets/myList';
import { FlatList } from 'react-native-gesture-handler';
import MyListItem from './../../../../components/my-list-item/MyListItem';
import { createStructuredSelector } from 'reselect';
import { authSelector, authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native'
import LoadingScreen from './../../../../components/LoadingScreen';
import { cacheImage, getCachedFile } from './../../../../utils/cacheImage';


const DEFAULT_PICKER_LIST = [
    'My List',
    'Pick 2',
    'Pick 3'
];

const MyListScreen = ({ AUTH, AUTH_PROFILE }) => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ selectedPicker, setSelectedPicker ] = useState('My List')

    const handleChangePicker = (value, index) => setSelectedPicker(value);

    const runAfterInteractions = () => {
        AUTH_PROFILE.my_list.map(({ id, poster }) => cacheImage(poster, id, `Users/${ AUTH_PROFILE.name }/MyList/Posters/`))
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setSelectedPicker('My List');
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
                    <MyListItem uri={ getCachedFile(`Users/${ AUTH_PROFILE.name }/MyList/Posters/`, item.id, item.poster) }/>
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
