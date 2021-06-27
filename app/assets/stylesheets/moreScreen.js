import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
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
    }
});

export default styles;