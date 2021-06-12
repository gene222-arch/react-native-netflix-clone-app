import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    avatarIcon: {
        borderRadius: 5
    },
    headerTitle: {
        flex: 1
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        alignItems: 'center',
    }
});

export default styles;