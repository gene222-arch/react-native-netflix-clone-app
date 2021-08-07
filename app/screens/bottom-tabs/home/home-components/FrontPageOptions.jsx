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
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';


const FrontPageOptions = ({ AUTH_PROFILE, frontPage, handleToggleAddToMyList, handleClickShowInfo }) => 
{
    const handleToggleAddToMyList_ = () => 
    {
        const hasAddedToList = AUTH_PROFILE.my_list.find(({ id }) => id === frontPage.id);

        const message = hasAddedToList ? 'Removed from My List' : 'Added to My List';
        handleToggleAddToMyList(message);
    }

    return (
        <View style={ styles.frontPageOptions }>
            <Image 
                source={{ 
                    uri: getCachedFile('FrontPages/', frontPage.id, frontPage.poster) }}
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
                <TouchableOpacity onPress={ handleToggleAddToMyList_ }>
                    <View style={ styles.myListInfoActionContainer }>
                        <FeatherIcon 
                            name={ AUTH_PROFILE.my_list.find(({ id }) => id === frontPage.id) ? 'check' : 'plus' }
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

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
}); 

export default connect(mapStateToProps)(FrontPageOptions)
