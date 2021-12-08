import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../../constants/Dimensions';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: DEVICE_WIDTH
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
        width: (DEVICE_WIDTH / 3) - 10,
        height: 160,
        resizeMode: 'cover',
        margin: 5,
        borderRadius: 5
    },
});

export default styles;
