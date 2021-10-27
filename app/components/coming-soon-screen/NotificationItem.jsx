import React from 'react'
import View from './../View';
import Text from './../Text';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-expo-image-cache';
import Colors from './../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import * as AUTH_ACTION from './../../redux/modules/auth/actions';
import { connect, useDispatch } from 'react-redux';


const NotificationItem = ({ AUTH_PROFILE, item, isReminded = false, isRead = false }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handlePress = () => 
    {
        if (isReminded && !isRead) {
            dispatch(AUTH_ACTION.markRemindedMovieAsReadStart({ 
                coming_soon_movie_id: item.released_details.coming_soon_movie_id, 
                user_profile_id: AUTH_PROFILE.id 
            }));
        }

        navigation.navigate('MovieDetailScreen', { 
            id: item.movie_id,
            headerTitle: item.movie.title
        });
    }

    return (
        <TouchableOpacity onPress={ handlePress }>
            <View style={ styles.container }>
                <Image 
                    uri={ item.movie.wallpaper_path }
                    preview={{  uri: item.movie.wallpaper_path  }}
                    style={ styles.img }
                />
                <View style={ styles.movieDescriptionContainer }>
                    <Text style={{ ...styles.movieNotifTypeText, color: `${ isRead ? '#FFF' : Colors.grey }` }}>
                        {
                            !isReminded 
                                ? item.type 
                                : (
                                    <>
                                        <FontAwesome5 
                                            name='bell'
                                            size={ 16 }
                                            color='#FFD700'
                                            solid
                                        />
                                        { `  Reminder: ${ item.type }` }
                                    </>
                                )
                        }
                    </Text>
                    <Text style={ styles.releasedAtText }>{ item.movie.title }</Text>
                    <Text style={ styles.releasedAtText }>{ item.created_at }</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(NotificationItem)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    img: {
        height: 85,
        aspectRatio: 16/9,
        resizeMode: 'cover',
        borderRadius: 5
    },
    movieDescriptionContainer: {
        padding: 10,
        paddingLeft: 15
    },  
    movieNotifTypeText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    releasedAtText: {
        fontSize: 14,
        color: Colors.grey
    }
});