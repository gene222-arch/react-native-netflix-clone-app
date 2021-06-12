import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    avatarIcon: {
        borderRadius: 5
    },
    frontPage: {
        width: '100%',
        height: Dimensions.get('window').height
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        paddingLeft: 15,
        paddingRight: 5,
        paddingBottom: 20,
        marginTop: 20
    },
    notificationsText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        padding: 10,
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