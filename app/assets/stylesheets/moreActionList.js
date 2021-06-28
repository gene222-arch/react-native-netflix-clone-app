import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    bottomSheetContainer: {
        backgroundColor: 'rgba(0, 0, 0, .7)'
    },
    container: {
    },
    deleteDownloadTitle: {
        color: Colors.white,
        textAlign: 'left',
        fontSize: 16,
        marginVertical: 10,
        marginHorizontal: 15,
    },
    downloadedMenu: {
        zIndex: 999,
        backgroundColor: Colors.darkGrey
    },
    listItemContainer: {
        backgroundColor: Colors.darkGrey
    },
    listItemTitle: {
        color: Colors.white
    },
    moreActionHeader: {
        fontSize: 24, 
        fontWeight: 'bold'
    },
    moreActionHeaderContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    viewMyDownloadsTitle: {
         color: Colors.white,
         textAlign: 'left',
         fontSize: 16,
         marginVertical: 10,
         marginHorizontal: 15,   
    }
});

export default styles;