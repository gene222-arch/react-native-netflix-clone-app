import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    duration: {
        color: Colors.grey,
        fontSize: 12
    },
    plot: {
        color: Colors.grey,
        marginVertical: 15
    },
    posterImg: {
        height: 75,
        aspectRatio: 16/9,
        resizeMode: 'cover',
        borderRadius: 5
    },
    title: {
        fontWeight: 'bold'
    },  
    titleHeader: {
        marginVertical: 10
    },
    titleContainer: {
        flex: 1,
        padding: 5
    }
});

export default styles;