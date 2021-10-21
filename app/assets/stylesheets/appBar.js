import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    avatarIcon: {
        borderRadius: 5
    },
    netflixLogo: {
        height: 45,
        width: 45,
        resizeMode: 'contain'
    },
    appBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        paddingHorizontal: 5,
        marginBottom: 5,
        height: 55
    },
    appBarSticky: {
    },
    headerTitleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },  
    searchIcon: {
        marginRight: 30
    },
    searchIconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

export default styles;