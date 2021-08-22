import { StyleSheet, Dimensions } from 'react-native';
import { DEVICE_HEIGHT } from '../../constants/Dimensions';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    actionBtnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        backgroundColor: 'transparent',
        marginBottom: 15,
    },
    appBarContainer: {
        backgroundColor: 'transparent',
    },  
    categoriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },  
    categoriesIcon: {
        paddingLeft: 10,
        marginTop: -5
    },
    continueWatchingForContainer: {
        marginVertical: 30,
    },
    continueWatchingForTitle: {
        paddingLeft: 10
    },
    frontPageOptions: {
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    homeFrontPage: {
        width: '100%',
        height: DEVICE_HEIGHT - (DEVICE_HEIGHT * .25),
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
        justifyContent: 'flex-end',
        padding: 30,
        paddingTop: 10,
        backgroundColor: 'transparent'
    },
    tabItem: {
        fontSize: 16,
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
        backgroundColor: 'transparent'
    },
    tabTitle: {
        fontSize: 12,
        padding: 0,
        color: Colors.white
    }
});

export default styles;