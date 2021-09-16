import { StyleSheet, StatusBar } from 'react-native';
import DEFAULT_IMG_STYLE from './../../constants/Image';
import { DEVICE_WIDTH } from './../../constants/Dimensions';
import Colors from './../../constants/Colors';

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
    appLogoImg: {
        width: '90%',
        height: '100%',
        resizeMode: 'contain'
    },
    cancelPinCodeText: {
        fontSize: 16,
        color: Colors.grey,
        textAlign: 'right',
        marginRight: 20
    },
    createProfileContainer: {
        width: '100%',
        alignSelf: 'center'
    },
    createProfileText: {
        textAlign: 'center',
        marginTop: 30
    },
    container: {
        marginTop: StatusBar.currentHeight + 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    inputContainer: {
        width: 42
    },  
    input: {
        color: '#FFF'
    },  
    inputAndErrorContainer: {
        backgroundColor: 'transparent'
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
    profile: {
        marginBottom: 40,
    },
    profilesContainer: {
        marginTop: 70,
        paddingHorizontal: 60
    },
    profileImg: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderRadius: DEFAULT_IMG_STYLE.DEFAULT_BORDER_RADIUS,
        marginBottom: 10,
        opacity: .4
    },
    profileImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    profileName: {
        textAlign: 'center'
    },
    statement: {
        textAlign: 'center',
    },
    whosWatchingText: {
        textAlign: 'center',
        marginBottom: 30,
    }
});

export default styles;