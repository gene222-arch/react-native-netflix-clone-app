import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, .7)'
    },
    listItemContainer: {
        backgroundColor: Colors.darkGrey
    },
    listItemTitle: {
        color: Colors.white
    },
    moreActionHeader: {
        fontSize: 24, 
        fontWeight: 'bold'
    },
    moreActionHeaderContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
});

export default styles;