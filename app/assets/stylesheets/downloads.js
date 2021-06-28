import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        // Style here
    },
    lastUpdateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    lastUpdateText: {
        color: Colors.grey, 
        fontSize: 14,
        marginLeft: 5
    },
    lastUpdateIcon: {
        color: Colors.grey, 
    },
    overlay: {
        backgroundColor: Colors.darkGrey,
        width: Dimensions.get('window').width / 2
    },
    overLayText: {
        marginVertical: 10,
        marginHorizontal: 15,
    },
    queryBtn: {
        backgroundColor: Colors.darkGrey
    },
    queryBtnTitle: {
        paddingHorizontal: 10
    },
    queryContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 15
    }
});

export default styles;