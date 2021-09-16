import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';
import { DEVICE_WIDTH } from './../../constants/Dimensions';

const styles = StyleSheet.create({
    actionBtnsContainer: {  
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'flex-end'
    },  
    alertIcon: {
        marginTop: 15,
        textAlign: 'left'
    },  
    cancelPinCodeText: {
        fontSize: 16,
        color: Colors.grey,
        textAlign: 'right',
        marginRight: 20
    },
    errorText: {
        textAlign: 'center',
        color: Colors.warning
    },  
    inputAndErrorContainer: { 
        backgroundColor: 'transparent'
    },  
    input: { 
        color: '#FFF'
    },  
    inputContainer: { 
        width: 42
    },
    inputPinCodeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 5
    },
    pinCodeOverLay: {
        backgroundColor: Colors.darkGrey,
        width: DEVICE_WIDTH / 1.15,
        padding: 10,
        paddingVertical: 25
    },
    statement: {
        textAlign: 'center',
    },
});

export default styles;