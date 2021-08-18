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
    image: {
        width: 120,
        height: 160,
        resizeMode: 'cover',
        margin: 5,
        borderRadius: 5
    },
});

export default styles;
