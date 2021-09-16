import { StyleSheet, StatusBar } from 'react-native';
import DEFAULT_IMG_STYLE from './../../constants/Image';
import { DEVICE_WIDTH } from './../../constants/Dimensions';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    alertIcon: {
        marginTop: 15,
        textAlign: 'left'
    },  
    appLogoImg: {
        width: '90%',
        height: '100%',
        resizeMode: 'contain'
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
    profile: {
        marginBottom: 20,
    },
    profilesContainer: {
        marginTop: 70,
        paddingHorizontal: 60
    },
    whosWatchingText: {
        textAlign: 'center',
        marginBottom: 30,
    }
});

export default styles;