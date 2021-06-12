import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    listContainer: {
        flexDirection : 'row', 
        flexWrap : 'wrap'
    },
    picker: {
        width: 120,
        color: Colors.white
    },
});

export default styles;
