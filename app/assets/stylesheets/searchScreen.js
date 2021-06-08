import { StyleSheet, Dimensions } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        backgroundColor: Colors.darkGrey
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContentText: {
        textAlign: 'center'
    },  
    listText: {
        textAlign: 'center',
        fontSize: 18,
        padding: 15,
        paddingVertical: 20,
        color: Colors.grey
    },
    searchInput: {
        fontSize: 14
    },
    searchContainer: {
        borderColor: 'transparent',
        borderWidth: 0,
        marginBottom: 20,
        backgroundColor: Colors.dark,
        padding: 2,
        paddingTop: 7,
    },
    searchInputContainer: {
        borderWidth: 0,
        borderBottomWidth: .5,
        backgroundColor: Colors.dark,
    }
});

export default styles;