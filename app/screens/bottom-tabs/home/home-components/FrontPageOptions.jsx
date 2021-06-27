import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import styles from './../../../../assets/stylesheets/homeScreen';
import Image from './../../../../components/Image';
import { getCachedFile } from './../../../../utils/cacheImage';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ShowInfo from './../../../../components/continue-watching-for-item/Info';


const FrontPageOptions = ({ frontPage, handleToggleAddToMyList, authUserMyList, frontPageCacheDirectory }) => 
{
    const [ showFrontPageInfo, setShowFrontPageInfo ] = useState(false);

    const handleClickShowInfo = () => setShowFrontPageInfo(!showFrontPageInfo);

    useEffect(() => {
        return () => {
            setShowFrontPageInfo(false);
        }
    }, []);

    return (
        <View style={ styles.frontPageOptions }>
            <ShowInfo selectedShow={ frontPage } isVisible={ showFrontPageInfo } setIsVisible={ setShowFrontPageInfo } />
            <Image 
                source={{ 
                    uri: getCachedFile(frontPageCacheDirectory, frontPage.id, frontPage.poster) }}
                style={ styles.homeFrontPageShowLogo }
            />
            <View style={ styles.tagsContainer }>
            {
                frontPage.tags.map((name, index) => (
                    <Text 
                        key={ index }
                        style={ styles.tagItem }
                    >
                        { (frontPage.tags.length - 1) !== index ? `${ name }  · ` : name }
                    </Text>
                ))
            }
            </View>
            <View style={ styles.actionBtnsContainer }>
                <TouchableOpacity onPress={ handleToggleAddToMyList }>
                    <View style={ styles.myListInfoActionContainer }>
                        <FeatherIcon 
                            name={ !authUserMyList.find(({ id }) => id === frontPage.id) ? 'check' : 'plus' }
                            size={ 24 }
                            color='#fff'
                        />
                        <Text style={ styles.myListInfoActionText }>My List</Text>
                    </View>
                </TouchableOpacity>
                <Button 
                    title='   Play'
                    icon={
                        <FontAwesome5 
                            name='play'
                            size={ 16 }
                            color='#000'
                        />
                    }
                    iconPosition='left'
                    onPress={ () => console.log('Dr. Stone is Playing...') }
                    buttonStyle={ styles.playBtn }
                    titleStyle={ styles.playBtnTitle }
                />
                <View style={ styles.myListInfoActionContainer }>
                    <TouchableOpacity onPress={ handleClickShowInfo }>
                        <FeatherIcon 
                            name='info'
                            size={ 24 }
                            color='#fff'
                        />
                        <Text style={ styles.myListInfoActionText }>Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default FrontPageOptions
