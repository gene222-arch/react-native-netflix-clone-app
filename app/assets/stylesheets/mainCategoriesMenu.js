import { StyleSheet, Dimensions } from 'react-native';
import Colors from './../../constants/Colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    categoryNameDefault: {
        marginTop: 25,
        fontSize: 18,
        color: Colors.grey
    },
    categoryNameSelected: {
        marginTop: 25,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white
    },  
    centeredView: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent',
    },
    floatingCloseBtn: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: Colors.white
    },
    floatingCloseBtnTitle: {
        color: Colors.dark
    },
    modalContentContainer: {
        backgroundColor: 'rgba(0, 0, 0, .8)'
    },
    modalView: {
        backgroundColor: 'transparent',
        padding: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    touchableHitSlop: { 
        left: width, 
        right: width
    }
});

export default styles;