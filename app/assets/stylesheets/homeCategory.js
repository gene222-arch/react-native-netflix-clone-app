import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    categoryContainer: {
        marginBottom: 20
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        marginBottom: 5
    },
    image: {
        width: 125,
        height: 170,
        resizeMode: 'cover',
        borderRadius: 5,
        marginRight: 5
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center'
    }
});

export default styles;