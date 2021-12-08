import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../../constants/Dimensions';
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
    image: {
        flex: 1,
        width: (DEVICE_WIDTH / 3) - 10,
        height: 170,
        resizeMode: 'cover',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 5
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