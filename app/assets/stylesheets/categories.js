import { StyleSheet, Dimensions } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
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
    continueWatchingForContainer: {
        marginVertical: 30,
    },
    frontPageOptions: {
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    homeFrontPage: {
        width: '100%',
        height: Dimensions.get('window').height - (Dimensions.get('window').height * .3),
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