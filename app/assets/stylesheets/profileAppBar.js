import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        paddingRight: 10,
        marginBottom: 5,
        height: 55
    },
    headerTitle: {
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.grey
    },
    saveText: {
        paddingRight: 20,
        fontSize: 16,
        color: Colors.success,
        fontWeight: 'bold'
    }
});

export default styles;
