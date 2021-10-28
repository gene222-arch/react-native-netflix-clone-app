import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../../constants/Dimensions';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 5,
        width: DEVICE_WIDTH
    },
    duration: {
        color: Colors.grey,
        fontSize: 12
    },
    plot: {
        color: Colors.grey,
        marginVertical: 15
    },
    posterImg: {
        height: 95,
        width: 150,
        resizeMode: 'contain',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    title: {
        fontWeight: 'bold'
    },  
    titleHeader: {
        marginVertical: 10
    },
    titleContainer: {
        textAlign: 'left',
        padding: 5,
        marginLeft: 15
    }
});

export default styles;