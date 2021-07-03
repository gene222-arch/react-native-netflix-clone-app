import React from 'react'
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ListItem, Divider, Button } from 'react-native-elements';
import styles from './../../assets/stylesheets/info';
import Text from './../Text';
import View from './../View';
import Image from './../Image';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const DEFAULT_SHOW = {
    id: '',
    title: '',
    genre: [],
    author: '',
    plot: '',
    wallpaper: '',
    duration: '',
    age_restriction: '',
    year: '',
    total_number_of_episodes: '',
    total_number_of_seasons: '',
    poster: ''
};

const Info = ({ selectedShow , isVisible, setIsVisible }) => 
{   
    selectedShow = selectedShow || DEFAULT_SHOW;

    return (
        <BottomSheet
            isVisible={ isVisible }
            containerStyle={ styles.container }
        >
            <View style={ styles.posterContainer }>
                <ListItem containerStyle={ styles.showDetails }>
                    <Image 
                        source={ typeof selectedShow?.poster === 'string' ? { uri: selectedShow?.poster } : selectedShow?.poster}
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
                                <Text style={ styles.yearAgeSeason }>2018</Text>
                                <Text style={ styles.yearAgeSeason }>15+</Text>
                                <Text style={ styles.yearAgeSeason }>15 Seasons</Text>
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
                    />
                </View>          
            </View>
            <Divider />
            {/* Episode and Info */}
            <ListItem containerStyle={ styles.episodeAndInfoContainer }>
                <FeatherIcon 
                    name='info'
                    size={ 24 }
                    color='#fff'
                />
                <ListItem.Content style={ styles.listItemContent }>
                    <ListItem.Title style={ styles.episodeAndInfoTitle }>Episode & Info</ListItem.Title>
                </ListItem.Content>
                <FeatherIcon 
                    name='chevron-right'
                    size={ 24 }
                    color='#fff'
                />
            </ListItem>   
        </BottomSheet>
    )
}

export default Info
