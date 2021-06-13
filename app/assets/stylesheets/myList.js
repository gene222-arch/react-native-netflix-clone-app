import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
