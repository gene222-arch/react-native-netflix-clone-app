import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';
import { DEVICE_WIDTH } from './../../constants/Dimensions';

const styles = StyleSheet.create({
    container: {
    },
    message: {
        color: Colors.grey,
        fontWeight: 'bold'
    },
    messageContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginLeft: (DEVICE_WIDTH / 2) - 40,
        backgroundColor: Colors.darkMode,
    }
});

export default styles;