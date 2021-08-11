import React from 'react'
import View from './../../../../components/View';
import styles from './../../../../assets/stylesheets/movieDetail';
import { Picker } from '@react-native-picker/picker';
import { Divider } from 'react-native-elements';
import Text from './../../../../components/Text';

const PaginationPicker = ({ selectedPage = 0, handleChangePage, pages = [] }) => 
{
    return pages.length > 0 && (
        <View>
            <Divider style={ styles.divider } />
            <View style={ styles.episodesAndMoreLikeThisContainer }>
                <Text style={ styles.episodeHeader }></Text>
                <Picker
                    selectedValue={ selectedPage }
                    onValueChange={ handleChangePage }
                    style={ styles.seasonPicker }
                >
                    { pages.map((page, index) => <Picker.Item key={ index } label={ `${ index + 1 }` } value={ page } />) }
                </Picker>
            </View>            
        </View>
    )
}

export default PaginationPicker
