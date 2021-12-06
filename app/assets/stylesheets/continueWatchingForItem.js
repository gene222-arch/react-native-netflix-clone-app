import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
    },
    continueWatchingForHeader: {
        color: Colors.grey,
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 10
    },  
    divider: {
        width: '92.5%'
    },
    dividerContainer: {
        width: '92.5%',
        backgroundColor: '#FFF'
    },
    emptyRecentWatchesContainer: {
        padding: 40
    },
    emptyRecentWatchesText: {
        textAlign: 'center'
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
    name: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    playIconContainer: {
        position: 'absolute',
        top: 50,
        left: 26,
        padding: 20,
        paddingHorizontal: 22,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderWidth: 1,
        borderColor: Colors.white
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