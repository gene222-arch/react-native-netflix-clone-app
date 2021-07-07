import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { GLOBAL_MARGIN_TOP } from './../../constants/Platform';

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
        height: 55,
        marginTop: GLOBAL_MARGIN_TOP
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
