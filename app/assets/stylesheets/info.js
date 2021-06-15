import { StyleSheet, Dimensions } from 'react-native';
import Colors from './../../constants/Colors';
import * as ScreenOrientation from './../../utils/screenOrientation'

const styles = StyleSheet.create({
    actionBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 45,
        backgroundColor: Colors.darkGrey,
        margin: 10,
        marginTop: 0,
    },
    actionBtnTitle: {
        fontSize: 12,
        color: Colors.grey
    },
    basicDetail: {
        flexDirection: 'row',
        backgroundColor: Colors.darkGrey,
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, .8)',
    },
    downloadBtn: {
        width: '100%',
        backgroundColor: Colors.darkGrey
    },
    episodeAndInfoContainer: {
        flex: 1,
        backgroundColor: Colors.darkGrey,
    },
    episodeAndInfoTitle: {
        color: Colors.white
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 10
    },
    posterContainer: {
        flex: 1,
        backgroundColor: Colors.darkGrey,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    posterDetails: {
        backgroundColor: Colors.darkGrey,
    },
    playBtn: {
        width: '100%',
        backgroundColor: Colors.white
    },
    playBtnTitle: {
        color: Colors.dark
    },
    plot: {
    },
    previewBtn: {
        width: '100%',
        backgroundColor: Colors.darkGrey
    },
    showDetails: {
        backgroundColor: Colors.darkGrey,
        alignItems: 'flex-start'
    },
    title: {
    },
    titleCloseBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.darkGrey,
        paddingBottom: 10
    },
    closeBtn: {
    },
    yearAgeSeason: {
        color: Colors.grey,
        paddingRight: 10,
        paddingBottom: 10
    }
});

export default styles;