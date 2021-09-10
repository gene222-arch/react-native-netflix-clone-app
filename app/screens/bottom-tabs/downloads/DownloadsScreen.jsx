import React, { useState, useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { InteractionManager, Platform, StatusBar, TouchableOpacity, FlatList, ToastAndroid, ActivityIndicator } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as AUTH_ACTION from './../../../redux/modules/auth/actions';
import { authSelector, authProfileSelector } from './../../../redux/modules/auth/selectors';
import { Button, Overlay  } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../../../components/View';
import Text from './../../../components/Text';
import AppBar from '../../AppBar';
import DownloadItem from '../../../components/download-item/DownloadItem';
import styles from './../../../assets/stylesheets/downloads';
import DownloadScreenLoader from '../../../components/loading-skeletons/DownloadScreenLoader';


const DownloadsScreen = ({ AUTH, AUTH_PROFILE }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ downloadedMovie, setDownloadedMovie ] = useState(null);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = (movie) => {
        setVisible(!visible);
        setDownloadedMovie(movie);
    }

    const handlePressDeleteDownload = async () => 
    {
        try {
            const FILE_URI = `${ FileSystem.documentDirectory }${ AUTH_PROFILE.id }${ downloadedMovie.movie.id }.mp4`;

            dispatch(AUTH_ACTION.removeToMyDownloadsStart({
                user_profile_id: AUTH_PROFILE.id,
                movie_id: downloadedMovie.movie.id
            }));

            await FileSystem.deleteAsync(FILE_URI);
            setVisible(false);
            ToastAndroid.show('Download Deleted', ToastAndroid.SHORT);
        } catch ({ message }) {
        }
    }

    const handlePressPlay = () => navigation.navigate('DisplayVideoRoot', {
        screen: 'DisplayVideoScreen',
        params: {
            title: downloadedMovie.movie.title,
            videoUri: downloadedMovie.uri, 
            id: downloadedMovie.movie_id 
        }
    });

    const runAfterInteractions = () => {
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);
        return () => {
            setIsInteractionsComplete(false);
            setVisible(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (AUTH_PROFILE.has_new_downloads) {
                dispatch(AUTH_ACTION.viewDownloadsStart());
            }

            return () => dispatch(AUTH_ACTION.viewDownloadsStart());
        }, [AUTH_PROFILE.has_new_downloads])
    );

    return (
        <View style={ styles.container }>
            <Overlay isVisible={ visible } onBackdropPress={ toggleOverlay } overlayStyle={ styles.overlay }>
                {
                    AUTH.isLoading 
                        ? <ActivityIndicator color='#FFFFFF' />
                        : (
                            <>
                                <TouchableOpacity onPress={ handlePressPlay }>
                                    <Text style={ styles.overLayText }>Play</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ handlePressDeleteDownload }>
                                    <Text style={ styles.overLayText }>Delete Download</Text>
                                </TouchableOpacity>
                            </>
                        )
                }
            </Overlay>

            <AppBar 
                marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } 
                showLogo={ false } 
                headerTitle='Downloads'
            />

            <View style={ styles.headerContainer }>
                <Text h4>Download's for you</Text>
                <View style={ styles.lastUpdateContainer }>
                    <FeatherIcon 
                        name='clock'
                        size={ 14 }
                        color='#fff'
                        style={ styles.lastUpdateIcon }
                    />
                    <Text style={ styles.lastUpdateText }>Updated 7 hours ago</Text>
                </View>
            </View>

            {
                !isInteractionsComplete
                    ? <DownloadScreenLoader />
                    : (
                        <FlatList 
                            keyExtractor={ (item, index) => index.toString() }
                            data={ AUTH_PROFILE.my_downloads }
                            renderItem={ ({ item }) => (
                                <DownloadItem 
                                    movie={ item } 
                                    onLongPress={ () => toggleOverlay(item) }
                                    handlePressPlay={ () => handlePressPlay(item) }
                                />
                            )}
                            showsHorizontalScrollIndicator={ false }
                            showsVerticalScrollIndicator={ false }
                        />
                    )
            }
                
            <View style={ styles.queryContainer }>
                <Button 
                    title='Find Something to Download'
                    titleStyle={ styles.queryBtnTitle }
                    buttonStyle={ styles.queryBtn }
                />
            </View>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(DownloadsScreen)
