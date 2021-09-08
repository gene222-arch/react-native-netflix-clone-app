import { StyleSheet, Dimensions } from 'react-native';
import { DEVICE_HEIGHT } from '../../constants/Dimensions';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        marginVertical: 30
    },
    actionBtnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        backgroundColor: 'transparent',
        marginBottom: 15,
    },
    categoriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginRight: 10
    },  
    categoriesIcon: {
        paddingLeft: 10,
        marginTop: -5
    },  
    container: {
        flex: 1
    },
    frontPageOptions: {
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    homeFrontPage: {
        width: '100%',
        height: DEVICE_HEIGHT - 200,
        resizeMode: 'cover',
        opacity: .8,
        justifyContent: 'space-between'
    },
    homeFrontPageShowLogo: {
        width: '50%',
        aspectRatio: 16/9,
        resizeMode: 'contain'
    },
    myListInfoActionContainer: {
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    myListInfoActionText: {
        paddingVertical: 2
    },
    playBtn: {
        paddingHorizontal: 20,
        backgroundColor: Colors.white
    },
    playBtnTitle: {
        color: Colors.dark
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 30,
        paddingLeft: 5,
        paddingTop: 10,
        backgroundColor: 'transparent'
    },
    tabItemAllCategories: {
        fontSize: 18,
        color: Colors.white
    }, 
    tabItemMainCategories: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.white
    },  
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 10,
        backgroundColor: 'transparent'
    },
    tagItem: {
        fontSize: 12
    },
    topMenuContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'space-between'
    },
    tabTitle: {
        fontSize: 12,
        padding: 0,
        color: Colors.white
    }
});

export default styles;