import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    categoriesContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },  
    categoriesIcon: {
        paddingLeft: 10,
        marginTop: -5
    },  
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
        paddingTop: 10
    },
    tabItem: {
        fontSize: 16
    },  
    container: {
        flex: 1,
        padding: 5
    },
    tabTitle: {
        fontSize: 12,
        padding: 0,
        color: Colors.white
    }
});

export default styles;