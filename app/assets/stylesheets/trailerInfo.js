import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    additionalTrailerText: {
        marginTop: 10,
        marginBottom: 20,
    },
    ageRestrictionText: {
        color: Colors.grey,
        marginTop: 10,
        padding: 2,
        paddingHorizontal: 10,
        backgroundColor: Colors.darkGrey,
        borderRadius: 2
    },
    tabCategoryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: Colors.grey
    },
    tabCategoryTitleSelected: {
        fontSize: 14.5,
        fontWeight: 'bold',
        textAlign: 'left',
        color: Colors.white
    },
    directorDesc: {
        fontWeight: 'bold'
    },
    directorText: {
        color: Colors.grey
    },
    divider: {
        marginTop: 30,
        marginBottom: 10,
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
    tabCategoryContainer: {
        width: '80%'
    },
    tabItemContainer: {
        backgroundColor: 'transparent'
    },
    tabIndicator: {
        backgroundColor: Colors.error
    },
    tabTitle: {
    },
    tabIsSelected: {
        color: Colors.white
    },
    trailerInfo: {
        paddingHorizontal: 10
    }, 
    trailerTitleLogo: {
        width: '100%',
        height: 100,
        resizeMode: 'contain'
    },
    yearDuration: {
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    yearDurationText: {
        color: Colors.grey,
        marginTop: 10,
    }
});

export default styles;