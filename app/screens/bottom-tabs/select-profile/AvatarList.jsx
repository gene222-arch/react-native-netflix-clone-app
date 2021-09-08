import React, { useState, useEffect } from 'react'
import { InteractionManager, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import LoadingSpinner from '../../../components/LoadingSpinner';
import View from '../../../components/View';
import ProfileAppBar from './ProfileAppBar';
import { useNavigation } from '@react-navigation/native';

const avatarList = [
    'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png',
    'https://noirflix.netlify.app/imgs/icon3.png',  
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c7906d33850498.56ba69ac353e1.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png'
];

const AvatarList = ({ handlePress }) => 
{
    const [ avatars, setAvatars ] = useState([]);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setAvatars(avatarList);
            setIsInteractionsComplete(true);
        });

        return () => {
            setAvatars([]);
            setIsInteractionsComplete(false);
        }
    }, [])

    if (! isInteractionsComplete) return <LoadingSpinner />

    return (
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
    )
}

export default AvatarList

const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginTop: 40,
        marginRight: 10
    }
});