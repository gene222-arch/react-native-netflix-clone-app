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
        padding: 15
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
    notFoundCaption: {
        color: Colors.grey,
        fontSize: 16
    },
    searchInput: {
        fontSize: 14
    },
    searchHeaderTitle: {
        marginBottom: 20,
        paddingLeft: 15
    }
});

export default styles;