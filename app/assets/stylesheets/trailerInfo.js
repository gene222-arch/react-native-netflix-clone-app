import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';
import { DEVICE_WIDTH } from './../../constants/Dimensions';

const styles = StyleSheet.create({
    additionalTrailerText: {
        marginTop: 10,
        marginBottom: 20,
    },
    ageRestrictionText: {
        color: Colors.dark
    },
    directorDesc: {
        fontWeight: 'bold'
    },
    directorText: {
        color: Colors.grey
    },
    divider: {
        marginTop: 30,
    },
    moreLikeThisContainer: {
        marginVertical: 15,
        paddingHorizontal: 5,
    },
    moreLikeThisEmptyMessageContainer: {
        width: '100%',
        height: 200,
        padding: 20,
    }, 
    similarMoviesNotFoundCaption: {
        color: Colors.grey,
        fontSize: 18,
    },
    moreLikeThisImg: {
        flex: 1,
        width: (DEVICE_WIDTH / 3) - 10,
        height: 170,
        resizeMode: 'contain',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10
    },
    plotText: {
        lineHeight: 20
    },
    starredArtistsText: {
        marginBottom: 5,
        color: Colors.grey
    },
    starringDesc: {
        fontWeight: 'bold'
    },
    starringDirectorContainer: {
        marginVertical: 10
    },
    tabCategoryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.grey
    },
    tabCategoryTitleSelected: {
        fontSize: 14.5,
        fontWeight: 'bold',
        color: Colors.white
    },
    tabCategoryContainer: {
        width: '80%',
        marginTop: 15,
    },
    tabItemContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    tabIndicator: {
        backgroundColor: Colors.error,
        height: 5,
    },
    tabTitle: {
        textAlign: 'left',
    },
    tabIsSelected: {
        color: Colors.white
    },
    trailersAndMoreContainer: {
        marginVertical: 15,
        paddingHorizontal: 5,
    },
    trailersAndMoreEmptyMessage: {
        marginTop: 15,
        paddingLeft: 5
    },
    trailerInfo: {
        paddingHorizontal: 10
    }, 
    trailerTitle: {
        fontSize: 16,
        marginTop: 10
    },
    trailerTitleLogo: {
        width: 150,
        height: 60,
        marginLeft: 20
    },
    yearDuration: {
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10
    },
    yearDurationText: {
        color: Colors.grey
    }
});

export default styles;