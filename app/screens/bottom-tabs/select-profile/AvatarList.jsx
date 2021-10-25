import React, { useState, useEffect } from 'react'
import { InteractionManager, StyleSheet, Platform } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';
import LoadingSpinner from '../../../components/LoadingSpinner';
import View from '../../../components/View';
import * as ImagePicker from 'expo-image-picker'
import { Button } from 'react-native-elements';
import Colors from './../../../constants/Colors';
import ImageComponent from './../../../components/Image';
import * as AUTH_API from './../../../services/auth/auth'
import { Image } from 'react-native-expo-image-cache';
import Text from '../../../components/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import * as ALERT_UTIL from './../../../utils/alert'
import * as Permissions from 'expo-permissions';

const avatarList = [
    'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png',
    'https://noirflix.netlify.app/imgs/icon3.png',  
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c7906d33850498.56ba69ac353e1.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png'
];

const AvatarList = ({ AUTH, handlePress, profile, setProfile, setShowAvatars }) => 
{
    const [ isLoading, setIsLoading ] = useState(false);
    const [ uploadAvatar, setUploadAvatar ] = useState(false);
    const [ avatars, setAvatars ] = useState([]);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const handlePressAllowAccessToImageLib = async () => 
    {
        try {
            if (Platform.OS !== 'web') 
            {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                
                status !== 'denied' 
                    ? chooseAvatarFromMediaLib() 
                    : ALERT_UTIL.okAlert('', `We need image library's permission to make this work`);
            }
        } catch (error) {}
    }

    const handlePressAllowTakePhoto = async () =>
    {
        try {
            if (Platform.OS !== 'web') 
            {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();

                status !== 'denied' 
                    ? captureAvatar() 
                    : ALERT_UTIL.okAlert('', `We need image library's permission to make this work`);
            }

        } catch (error) {}
    }

    const captureAvatar = async () => 
    {
        try {
            const { cancelled, uri } = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

            if (! cancelled) {
                uploadImage(uri);
            }

        } catch (error) {}
    }

    const chooseAvatarFromMediaLib = async () => 
    {
        try {
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        
            if (! cancelled) {
                uploadImage(uri);
            }
        } catch (error) {}
    };

    const uploadImage = async (uri) =>
    {
        setIsLoading(true);
        try {
            const filename = uri.split('/').pop();
          
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
          
            const formData = new FormData();
            formData.append('avatar', { uri, name: filename, type });

            const { data, status } = await AUTH_API.uploadAvatar(formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            });
            
            if (status === 'success') {
                setProfile({ ...profile, avatar: data });
            }

        } catch (error) {}
        setIsLoading(false);
    }
    

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setAvatars(avatarList);
            setIsInteractionsComplete(true);
        });

        return () => {
            setAvatars([]);
            setIsInteractionsComplete(false);
            setUploadAvatar(false);
            setIsLoading(false);
        }
    }, [])

    if (! isInteractionsComplete || isLoading) return <LoadingSpinner message='Uploading image...' />

    if (uploadAvatar) {
        return (
            <>
                <View style={ styles.uploadImgContainer }>
                    <ImageComponent source={{ uri: profile.avatar }} style={ styles.imgDefault } />
                </View>
                <Button 
                    title='Choose an image'
                    buttonStyle={ styles.chooseImgBtn } 
                    titleStyle={ styles.btnTitle } 
                    onPress={ handlePressAllowAccessToImageLib }
                    icon={
                        <FeatherIcon 
                            name='image'
                            size={ 24 }
                            color={ Colors.dark }
                        />
                    }
                />
                <Text></Text>
                <Button 
                    title='Take a photo' 
                    buttonStyle={ styles.takeAPhotoBtn } 
                    titleStyle={ styles.btnTitle } 
                    onPress={ handlePressAllowTakePhoto }
                    icon={
                        <FeatherIcon 
                            name='aperture'
                            size={ 24 }
                            color={ Colors.netFlixRed }
                        />
                    }
                />
            </>
        )
    }

    return (
        <View style={ styles.container }>
            <FlatList 
                contentContainerStyle={ styles.contentContainer }
                keyExtractor={ (item, index) => index.toString() }
                data={ avatars }
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={ () => handlePress(item) }>
                        <Image uri={ item } preview={{ uri: item }} style={ styles.img } />
                    </TouchableOpacity>
                )}
                numColumns={ 3 }
                ListHeaderComponent={ 
                    <>
                        {
                            profile.previous_avatar && (
                                <>
                                    <Text h4 style={ styles.lastAvatarText }>Last Avatar</Text>
                                    <TouchableOpacity onPress={ () => handlePress(profile.previous_avatar) }>
                                        <Image 
                                            uri={ profile.previous_avatar } 
                                            preview={{ uri: profile.previous_avatar }} 
                                            style={ styles.previousAvatar } 
                                        />
                                    </TouchableOpacity>
                                </>
                            )
                        }
                        <Text h4 style={ styles.defaulAvatarsListText }>Default Lists</Text>
                    </>
                }
            />
            {
                AUTH.auth.subscription_details.type === 'Premium' && (
                    <Button title='Upload An Avatar' buttonStyle={ styles.btn } onPress={ () => setUploadAvatar(true) } />
                )
            }
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(AvatarList)

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.netFlixRed,
        marginBottom: 5
    },
    btnTitle: {
        textAlign: 'center',
        paddingHorizontal: 10
    },
    chooseImgBtn: {
        backgroundColor: Colors.netFlixRed
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between'
    },
    defaulAvatarsListText: {
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 40,
        marginRight: 10
    },
    imgDefault: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 20
    },
    lastAvatarText:{
        paddingHorizontal: 5
    },
    previousAvatar: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginTop: 10
    },
    takeAPhotoBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Colors.white
    },
    uploadImgContainer: {
        alignItems: 'center',
        marginTop: 40,
        width: '100%'
    }
});