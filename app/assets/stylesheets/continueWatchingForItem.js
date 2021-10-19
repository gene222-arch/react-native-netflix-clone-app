import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    divider: {
        width: '92.5%'
    },
    dividerContainer: {
        width: '92.5%',
        backgroundColor: '#FFF'
    },
    infoMoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.darkMode,
        paddingVertical: 10,
        marginRight: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    playIcon: {
        position: 'absolute',
        top: '30%',
        left: '25%'
    },
    poster: {
        width: 125,
        height: 170,
        marginRight: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        resizeMode: 'cover'
    },
});

export default styles;