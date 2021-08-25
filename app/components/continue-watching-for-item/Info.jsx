import React from 'react'
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ListItem, Divider, Button } from 'react-native-elements';
import styles from './../../assets/stylesheets/info';
import Text from './../Text';
import View from './../View';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import { Image } from 'react-native-expo-image-cache';


const MovieInfo = ({ AUTH_PROFILE, selectedShow, isVisible, setIsVisible }) => 
{   
    const navigation = useNavigation();

    const handlePressPlay = () => navigation.navigate('DisplayVideoRoot', {
        screen: 'DisplayVideoScreen',
        params: {
            title: selectedShow?.title,
            videoUri: selectedShow?.video_path, 
            id: selectedShow?.id 
        }
    });
    
    const handlePressPlayPreview = () => navigation.navigate('DisplayVideoScreen', { 
        videoUri: selectedShow?.video_trailer_path, 
        id: selectedShow?.id 
    });

    const handlePressNavigateToShowDetailScreen = () => navigation.navigate('MovieDetailScreen', { 
        id: selectedShow?.id,
        headerTitle: selectedShow?.title
    });

    return (
        <BottomSheet
            isVisible={ isVisible }
            containerStyle={ styles.container }
        >
            <StatusBar backgroundColor='rgba(0, 0, 0, .8)' />
            <View style={ styles.posterContainer }>
                <ListItem containerStyle={ styles.showDetails }>
                    <Image 
                        preview={{ uri: selectedShow?.poster_path }}
                        uri={ selectedShow?.poster_path }
                        style={ styles.poster }
                    />
                    <ListItem.Content>
                        <View style={ styles.posterDetails }>
                            <View style={ styles.titleCloseBtnContainer }>
                                <Text h4 style={ styles.title }>{  selectedShow?.title }</Text>
                                <TouchableOpacity onPress={ () => setIsVisible(false) }>
                                    <FeatherIcon 
                                        name='x-circle'
                                        size={ 24 }
                                        color='#fff'
                                        style={ styles.closeBtn }
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={ styles.basicDetail }>
                                <Text style={ styles.yearAgeSeason }>{ selectedShow?.year_of_release }</Text>
                                <Text style={ styles.yearAgeSeason }>{ selectedShow?.age_restriction }+</Text>
                            </View>
                            <Text style={ styles.plot }>{ selectedShow?.plot.slice(0, 250).concat('...') }</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>

                {/* Action Buttons */}
                <View style={ styles.actionBtns }>
                    <Button
                        title='   Play'
                        icon={
                            <FontAwesome5Icon 
                                name='play'
                                size={ 22 }
                                color='#000'
                                solid
                            />
                        }
                        titleStyle={ styles.playBtnTitle }
                        buttonStyle={ styles.playBtn }
                        onPress={ handlePressPlay }
                    />
                    <Button
                        type='clear' 
                        title='Download'
                        icon={
                            <FeatherIcon 
                                name='download'
                                size={ 26 }
                                color='#fff'
                            />
                        }
                        iconPosition='top'
                        buttonStyle={ styles.downloadBtn }
                        titleStyle={ styles.actionBtnTitle }
                    />
                    <Button
                        type='clear' 
                        title='Preview'
                        icon={
                            <FeatherIcon 
                                name='play'
                                size={ 26 }
                                color='#fff'
                            />
                        }
                        iconPosition='top'
                        buttonStyle={ styles.previewBtn }
                        titleStyle={ styles.actionBtnTitle }
                        onPress={ handlePressPlayPreview }
                    />
                </View>          
            </View>
            <Divider />
            {/* Episode and MovieInfo */}
            <TouchableOpacity onPress={ handlePressNavigateToShowDetailScreen }>
                <ListItem containerStyle={ styles.episodeAndMovieInfoContainer }>
                    <FeatherIcon 
                        name='info'
                        size={ 24 }
                        color='#fff'
                    />
                    <ListItem.Content style={ styles.listItemContent }>
                        <ListItem.Title style={ styles.episodeAndMovieInfoTitle }>Episode & MovieInfo</ListItem.Title>
                    </ListItem.Content>
                    <FeatherIcon 
                        name='chevron-right'
                        size={ 24 }
                        color='#fff'
                    />
            </ListItem> 
            </TouchableOpacity>  
        </BottomSheet>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(MovieInfo)
