import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    addMoreProfile: {
        borderColor: Colors.grey,
        borderWidth: .8,
        borderRadius: 2.5
    },
    addProfileText: {
        color: Colors.grey,
        textAlign: 'center',
        fontSize: 13,
        marginTop: 5
    },
    container: {
        flex: 1,
        padding: 0,
        paddingTop: 10
    },
    listItem: {
        backgroundColor: Colors.darkGrey
    },
    lists: {
        flex: 1,
        backgroundColor: Colors.darkGrey
    },
    listItemTitle: {
        color: Colors.grey
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;