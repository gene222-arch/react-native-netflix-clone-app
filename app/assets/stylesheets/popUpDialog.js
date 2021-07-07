import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';
import { DEVICE_WIDTH } from './../../constants/Dimensions';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkGrey,
        width: DEVICE_WIDTH / 1.15,
        padding: 20
    },
    actionBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 'auto',
        marginTop: 25,
        width: DEVICE_WIDTH / 2.5,
        backgroundColor: 'transparent'
    },
    textConfirm: {
        fontSize: 16,
        color: Colors.grey
    },
    textQuery: {
        fontSize: 18,
        color: Colors.grey,
        textAlign: 'justify',
        lineHeight: 20
    },
    textCancel: {
        fontSize: 16,
        paddingRight: 25,
        color: Colors.grey
    },
});

export default styles;
