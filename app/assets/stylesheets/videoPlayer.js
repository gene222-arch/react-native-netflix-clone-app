import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    video: {
        width: '100%',
        aspectRatio: 16/9
    },
    poster: {
        width: '100%',
        aspectRatio: 16/9,
        resizeMode: 'cover'
    }
});

export default styles;