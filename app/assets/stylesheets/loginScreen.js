import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 5
    },
    checkbox: {
        marginRight: 10
    },  
    errorMessageText: {
        textAlign: 'center',
        color: Colors.warning,
        marginVertical: 10
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
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.grey,
        color: Colors.white,
        height: 50,
        borderRadius: 5
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
        marginBottom: 40
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
    },
    showPasswordContainer: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 15
    },
    showPasswordText: {
        color: Colors.grey
    },
});

export default styles;