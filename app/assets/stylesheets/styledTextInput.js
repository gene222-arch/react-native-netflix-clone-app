import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';
import { DEVICE_WIDTH } from './../../constants/Dimensions';

const styles = (error = false) => StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
    },
    helperText: {
        color: error ? Colors.warning : 'transparent',
        marginLeft: 10
    },
    textField: {
        height: 60,
        width: DEVICE_WIDTH,
        borderBottomWidth: error ? 2 : 0,
        borderColor: error ? Colors.error : 'transparent'
    }
});

export default styles