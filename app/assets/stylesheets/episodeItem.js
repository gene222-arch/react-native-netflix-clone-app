import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../../constants/Dimensions';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,
        width: DEVICE_WIDTH - 20
    },
    duration: {
        color: Colors.grey,
        fontSize: 12
    },
    plot: {
        color: Colors.grey,
        marginVertical: 15
    },
    title: {
        fontWeight: 'bold'
    },  
    titleHeader: {
        marginVertical: 10
    },
    titleContainer: {
        textAlign: 'left',
        padding: 5,
        marginLeft: 15
    },
    wallpaperImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    wallpaperImageContainer: {
        height: 95,
        width: 160,
    }
});

export default styles;