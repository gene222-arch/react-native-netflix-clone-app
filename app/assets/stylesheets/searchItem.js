import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2,
        
        backgroundColor: Colors.darkGrey
    },
    image: {
        height: 75,
        aspectRatio: 16/9,
        resizeMode: 'cover',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    titlePlayIconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'transparent'
    }
});

export default styles;