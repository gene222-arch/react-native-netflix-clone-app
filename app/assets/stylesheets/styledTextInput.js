import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = (error = false) => StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
    },
    helperText: {
        color: error ? Colors.warning : 'transparent',
        marginBottom: 20,
        marginLeft: 10
    },
    textField: {
        height: 60,
        borderBottomWidth: error ? 2 : 0,
        borderColor: error ? Colors.error : 'transparent',
    }
});

export default styles