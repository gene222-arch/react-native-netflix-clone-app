import React, { useState, useEffect } from 'react'
import View from '../../../../components/View';
import Text from '../../../../components/Text';
import { Picker } from '@react-native-picker/picker';
import styles from './../../../../assets/stylesheets/myList';
import { FlatList } from 'react-native-gesture-handler';
import MyListItem from './../../../../components/my-list-item/MyListItem';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native'
import LoadingScreen from './../../../../components/LoadingScreen';

const DEFAULT_PICKER_LIST = [
    'My List',
    'Pick 2',
    'Pick 3'
];

const MyListScreen = ({ AUTH }) => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ myList, setMyList ] = useState([]);
    const [ selectedPicker, setSelectedPicker ] = useState('My List')

    const handleChangePicker = (value, index) => setSelectedPicker(value);

    const runAfterInteractions = () => {
        setMyList(AUTH.myList);
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);
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
                data={ myList }
                renderItem={ ({ item }) => <MyListItem uri={ item.poster }/> }
                numColumns={ 3 }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(MyListScreen)
