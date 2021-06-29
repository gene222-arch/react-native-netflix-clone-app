import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from './../../constants/Dimensions';

const styles = StyleSheet.create({
    video: {
        flex: 1,
        width: '100%',
        aspectRatio: 16/9
    },
    poster: {
        width: '100%',
        aspectRatio: 16/9,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    playIcon: {
        position: 'absolute',
        marginLeft: (DEVICE_WIDTH / 2) - 35,
        marginTop: (DEVICE_WIDTH / 4) - 35,
    }
});

export default styles;