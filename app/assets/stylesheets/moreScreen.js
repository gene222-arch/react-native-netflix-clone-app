import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';
import { DEVICE_WIDTH } from './../../constants/Dimensions';

const styles = StyleSheet.create({
    cancelSignOut: {
        fontSize: 16,
        color: Colors.grey
    },
    container: {
        flex: 1,
        padding: 0,
        paddingTop: 10
    },
    listItem: {
        backgroundColor: Colors.dark
    },
    lists: {
        flex: 1,
    },
    listItemTitle: {
        color: Colors.grey,
        fontSize: 18
    },
    manageProfilesBtnTitle: {
        color: Colors.grey
    },
    manageProfilesContainer: {
        marginVertical: 15
    },
    manageProfilesBtnIcon: {
        color: Colors.grey
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileContainerContent: {
        flex: 1,
        justifyContent: 'center'
    },
    signOutDialog: {
        backgroundColor: Colors.darkGrey,
        width: DEVICE_WIDTH / 1.15,
        padding: 20
    },
    signOutDialogActionBtns: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 'auto',
        marginTop: 25,
        width: DEVICE_WIDTH / 2.5,
        backgroundColor: 'transparent'
    },
    signOut: {
        fontSize: 16,
        color: Colors.grey
    },
    signOutQuery: {
        fontSize: 16,
        color: Colors.grey
    },
});

export default styles;