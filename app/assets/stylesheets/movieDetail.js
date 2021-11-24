import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';
import { DEVICE_WIDTH } from './../../constants/Dimensions';

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
    divider: {
        marginVertical: 20,
        height: 2
    },
    downloadBtn: {
        marginTop: 10,
        backgroundColor: Colors.darkGrey,
        color: Colors.white
    },
    episodesAndMoreLikeThisContainer: {
        paddingHorizontal: 5,
    },
    container: {
        flex: 1
    },
    episodeHeader: {
        fontSize: 14
    },  
    listHeaderComponent: {
        marginBottom: 10,
        paddingHorizontal: 5
    },  
    loadingStyle: {
        color: Colors.dark
    },
    movieContainer: {
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
        width: DEVICE_WIDTH / 2.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    pickerItem: {
        color: Colors.darkMode
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
        color: Colors.white,
        backgroundColor: Colors.darkGrey,
        marginTop: 20
    },
    similarMoviesText: {
        marginTop: 40,
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },  
    year: {
        color: Colors.grey
    }
});

export default styles;