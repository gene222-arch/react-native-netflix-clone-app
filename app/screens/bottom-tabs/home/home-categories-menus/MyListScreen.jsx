import React, { useState } from 'react'
import View from '../../../../components/View';
import Text from '../../../../components/Text';
import { Picker } from '@react-native-picker/picker';
import styles from './../../../../assets/stylesheets/myList';
import { FlatList } from 'react-native-gesture-handler';
import myList from './../../../../services/data/myList';
import MyListItem from './../../../../components/my-list-item/MyListItem';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const DEFAULT_PICKER_LIST = [
    'My List',
    'Pick 2',
    'Pick 3'
];

const MyListScreen = ({ AUTH }) => 
{
    const [ selectedPicker, setSelectedPicker ] = useState('My List')

    const handleChangePicker = (value, index) => setSelectedPicker(value);

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
                data={ AUTH.myList }
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
