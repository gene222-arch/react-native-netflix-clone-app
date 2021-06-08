import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';


const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    duration: {
        color: Colors.grey,
        fontSize: 12
    },
    imagePosterIcon: {
        position: 'absolute',
        left: '40%',
        top: '40%',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderRadius: 20
    },
    plot: {
        color: Colors.grey
    },
    posterImg: {
        height: 80,
        aspectRatio: 16/9,
        resizeMode: 'cover',
        borderRadius: 3
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
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