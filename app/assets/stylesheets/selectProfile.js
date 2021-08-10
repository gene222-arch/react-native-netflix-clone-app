import { StyleSheet, StatusBar } from 'react-native';
import DEFAULT_IMG_STYLE from './../../constants/Image';


const styles = StyleSheet.create({
    appLogoImg: {
        width: '30%',
        height: 50
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
    whosWatchingText: {
        textAlign: 'center',
        marginBottom: 30,
    }
});

export default styles;