import { StyleSheet, Dimensions } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    categoriesTxt: {
        textAlign: 'center',
        fontSize: 18,
        color: Colors.grey,
        paddingVertical: 20
    },
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent',
    },
    closeBtn: {
        backgroundColor: Colors.white,
        padding: 20,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    closeBtnContainer: {
        position: 'absolute',
        bottom: 20
    },
    closeBtnTitle: {
        color: Colors.dark
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, .8)',
        padding: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    xIcon: {
        padding: 20
    },
    icon: {
        backgroundColor: Colors.white
    }
});

export default styles;