import { StyleSheet, Dimensions } from 'react-native';
import Colors from './../../constants/Colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../../constants/Dimensions';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    deleteProfileBtn: {
        backgroundColor: Colors.dark,
        paddingTop: 330
    },
    deleteProfileDialog: {
        backgroundColor: Colors.darkGrey,
        width: DEVICE_WIDTH / 1.15,
        padding: 20
    },
    switchContainer: {
        flexDirection: 'row'
    },
    switchLabel: {
        fontSize: 18,
        paddingRight: 15
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginTop: 40,
    },
    imgContainer: {
        marginBottom: 40,
    },
    imgIcon: {
        position: 'absolute',
        bottom: -10,
        right: -5,
        padding: 2,
        borderRadius: 5
    },
    input: {
        width: '80%',
        backgroundColor: Colors.darkGrey,
        borderRadius: 5,
        height: 55,
        color: Colors.white,
        padding: 15,
        marginBottom: 40,
    },
    inputContainer: {
        alignItems: 'stretch'
    },
    switch: {
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, .8)'
    },
    deleteBtnTitle: {
        color: Colors.grey
    }
});

export default styles;
