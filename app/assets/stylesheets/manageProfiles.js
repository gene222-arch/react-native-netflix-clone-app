import { StyleSheet, StatusBar } from 'react-native';
import DEFAULT_IMG_STYLE from './../../constants/Image';
import Colors from './../../constants/Colors';


const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight + 10,
    },
    editIcon: {
        borderWidth: 3,
        width: 62,
        borderColor: Colors.white,
        borderRadius: 150,
        padding: 15,
        paddingLeft: 18,
        paddingTop: 17,
        position: 'absolute',
        left: 28,
        top: 28
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    profile: {
        marginBottom: 40,
        opacity: .3
    },
    profileContainer: {

    },
    profilesContainer: {
        marginTop: 70,
        paddingHorizontal: 40
    },
    profileImg: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderRadius: DEFAULT_IMG_STYLE.DEFAULT_BORDER_RADIUS,
        marginBottom: 10
    },
    profileImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    profileName: {
        textAlign: 'center'
    },
});

export default styles;