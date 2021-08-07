import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    email: {
        marginTop: 25,
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    inputContainerStyle: {
        backgroundColor: Colors.darkGrey,
        borderRadius: 5,
        height: 45,
        color: Colors.white,
        padding: 15,
    },
    loginBtn: {
        backgroundColor: Colors.netFlixRed,
        color: Colors.white,
        height: 45
    },
    loginFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    needHelp: {
        color: Colors.grey,
        fontWeight: 'bold'
    },  
    title: {
        color: Colors.white
    },
    rememberMeContainer: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        padding: 0,
        alignItems: 'flex-start'
    },
    rememberMeText: {
        color: Colors.grey
    }
});

export default styles;