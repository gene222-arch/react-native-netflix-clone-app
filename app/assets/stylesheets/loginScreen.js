import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    email: {
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
        padding: 20
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
    password: {
    },  
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
    },  
    touchablePassword: {
        zIndex: 111
    },  
    title: {
        color: Colors.white,
        marginBottom: 20
    },
    rightIcon: {
        position: 'absolute',
        bottom: 0,
        right: 10
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