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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        padding: 5,
        marginBottom: 5
    },
    searchIcon: {
        marginRight: 30
    },
    searchIconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default styles;