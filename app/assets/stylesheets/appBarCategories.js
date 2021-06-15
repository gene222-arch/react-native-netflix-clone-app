import { StyleSheet, Dimensions } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    bottomSheetContainer: {
        backgroundColor: 'rgba(0, 0, 0, .8)'
    },
    closeBtn: {
        backgroundColor: Colors.white,
        padding: 20,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    closeBtnContainerPortrait: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    closeBtnContainerLandscape: {
        position: 'absolute',
        top: '40%',
        left: '45%'
    },
    closeBtnTitle: {
        color: Colors.dark
    },
    container: {

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