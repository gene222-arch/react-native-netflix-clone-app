import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2.5,
        backgroundColor: Colors.darkMode
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    imageContainer: {
        height: 90,
        width: 150,
    },
    title: {
        flex: 1,
        flexWrap: 'wrap',
        color: Colors.grey,
        fontSize: 12.5
    },
    titlePlayIconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'transparent'
    }
});

export default styles;