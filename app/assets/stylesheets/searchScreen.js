import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkGrey
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
        paddingBottom: 5
    },
    searchInputContainer: {
        borderWidth: 0,
        borderBottomWidth: .5,
        backgroundColor: Colors.dark,
    }
});

export default styles;