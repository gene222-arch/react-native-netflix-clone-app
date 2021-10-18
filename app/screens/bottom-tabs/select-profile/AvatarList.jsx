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

const avatarList = [
    'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png',
    'https://noirflix.netlify.app/imgs/icon3.png',  
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c7906d33850498.56ba69ac353e1.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png'
];

const AvatarList = ({ handlePress, profile, setProfile, setShowAvatars }) => 
{
    const [ uploadAvatar, setUploadAvatar ] = useState(false);
    const [ avatars, setAvatars ] = useState([]);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const handlePressAllowAccessToImageLib = async () => 
    {
        setUploadAvatar(true);

        try {
            if (Platform.OS !== 'web') 
            {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (status !== 'granted') {
                    setShowAvatars(true);
                }
            }
        } catch (error) {
            
        }
    }

    const handlePressChooseAvatar = async () => 
    {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    
        if (! result.cancelled) 
        {
            try {
                const localUri = result.uri;
                const filename = localUri.split('/').pop();
              
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
              
                const formData = new FormData();
                formData.append('avatar', { uri: localUri, name: filename, type });
    
                const { data, status } = await AUTH_API.uploadAvatar(formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    }
                });
                
                if (status === 'success') 
                {
                    setProfile({ ...profile, avatar: data });
                    setShowAvatars(false);
                }
            } catch (error) {
                
            }
        }
    };
    

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setAvatars(avatarList);
            setIsInteractionsComplete(true);
        });

        return () => {
            setAvatars([]);
            setIsInteractionsComplete(false);
            setUploadAvatar(false);
        }
    }, [])

    if (! isInteractionsComplete) return <LoadingSpinner />

    if (uploadAvatar) {
        return (
            <View style={ styles.uploadImgContainer }>
                <ImageComponent source={{ uri: profile.avatar }} style={ styles.imgDefault } />
                <Button 
                    title='Choose an image' 
                    buttonStyle={ styles.chooseImgBtn } 
                    titleStyle={ styles.chooseBtnTitle } 
                    onPress={ handlePressChooseAvatar }
                />
            </View>
        )
    }

    return (
        <View style={ styles.container }>
            <View>
                <FlatList 
                    keyExtractor={ (item, index) => index.toString() }
                    data={ avatars }
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={ () => handlePress(item) }>
                            <Image uri={ item } preview={{ uri: item }} style={ styles.img } />
                        </TouchableOpacity>
                    )}
                    numColumns={ 3 }
                />
            </View>
            <View>
                <Button title='Upload An Avatar' buttonStyle={ styles.btn } onPress={ handlePressAllowAccessToImageLib } />
            </View>
        </View>
    )
}

export default AvatarList

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.netFlixRed,
        marginBottom: 5
    },
    chooseBtnTitle: {
        textAlign: 'center',
        width: '100%',
        flex: 1
    },
    chooseImgBtn: {
        backgroundColor: Colors.netFlixRed,
        width: '100%'
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between'
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginTop: 40,
        marginRight: 10
    },
    imgDefault: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 20
    },
    uploadImgContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40
    }
});