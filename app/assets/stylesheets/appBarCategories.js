import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    closeBtn: {
        backgroundColor: Colors.white,
    },
    closeBtnTitle: {
        color: Colors.dark
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, .8)'
    },  
    listContainer: {
        backgroundColor: 'transparent'
    },
    listItemContent: {
        alignItems: 'center'
    },
    listTitle: {
        color: Colors.grey,
        fontSize: 16
    },
    xIcon: {
        padding: 20
    },
    icon: {
        backgroundColor: Colors.white
    }
});

export default styles;