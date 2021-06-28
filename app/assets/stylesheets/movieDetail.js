import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    ageContainerText: {
        color: Colors.dark,
        fontSize: 12
    },
    cast: {
        color: Colors.grey
    },
    castCreatorContainer: {
        marginTop: 10
    },
    creator: {
        color: Colors.grey
    },
    downloadBtn: {
        marginTop: 10,
        backgroundColor: Colors.darkGrey,
        color: Colors.white
    },
    container: {
        flex: 1
    },
    episodeHeader: {
        marginTop: 12
    },  
    listHeaderComponent: {
        marginBottom: 10
    },  
    moviePoster: {
        width: '100%',
        aspectRatio: 16/9,
        resizeMode: 'cover',
        marginTop: 50
    },
    match: {
        color: Colors.success,
    },
    movieTitleContainer: {
        paddingTop: 10,
    },
    movieTitleInfo: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    playBtn: {
        backgroundColor: Colors.white
    },
    playBtnTitle: {
        color: Colors.dark
    },
    plot: {
        marginTop: 10,
    },
    seasons: {
        color: Colors.grey
    },
    seasonPicker: {
        width: 150,
        color: Colors.white
    },
    tabsContainer: {
        width: '80%',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    tabIndicator: {
        backgroundColor: Colors.error
    },
    tabItemContainer: {
        backgroundColor: 'transparent'
    },  
    tabItemTitle: {
        fontSize: 10,
        color: Colors.grey
    },
    tabItem: {

    },
    videoPlayerContainer: {
    },  
    year: {
        color: Colors.grey
    }
});

export default styles;