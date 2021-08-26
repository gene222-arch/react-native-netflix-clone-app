import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';
import { currentScreenOrientation } from './../../utils/screenOrientation';

const styles = StyleSheet.create({
    additionalInfoText: {
        marginTop: 10,
        color: Colors.grey,
        fontSize: 16
    },
    container: {
        flex: 1,
        marginBottom: 30
    },  
    comingSoonVideoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15
    },
    infoContainer: {
        alignItems: 'center'
    },
    plot: {
        color: Colors.grey,
        lineHeight: 20,
        textAlign: 'justify'
    },
    tags: {
        paddingVertical: 5
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    title: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 10
    },
    remindMeContainer: {
        alignItems: 'center',
        marginRight: 30
    },
    remindMeInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -75,
        marginRight: 60
    },
    remindMeInfoText: {
        color: Colors.grey,
        fontSize: 12,
        marginTop: 10
    },
    poster: {
        width: '100%',
        height: 70,
        marginTop: 5,
        resizeMode: 'contain'
    },
    posterStyle: {
        width: '100%',
        aspectRatio: 16/9,
        resizeMode: 'cover',
        opacity: 1
    },
    video: {
        width: '100%',
        aspectRatio: 16/9,
        marginBottom: -2.5
    },
    videoInfo: {
        paddingHorizontal: currentScreenOrientation === 'PORTRAIT' ? 2.5 : 10
    }
});

export default styles;