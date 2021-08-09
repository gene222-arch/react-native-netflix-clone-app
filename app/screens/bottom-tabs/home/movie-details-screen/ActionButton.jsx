import React from 'react'
import View from './../../../../components/View';
import { Tab } from 'react-native-elements';
import styles from './../../../../assets/stylesheets/movieDetail';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector, authSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import ActivityIndicatorWrapper from './../../../../components/ActivityIndicatorWrapper';

const ActionButton = ({ AUTH, AUTH_PROFILE, movieID, handlePressAddToMyList,  handlePressLike,  handlePressTabShare }) => 
{
    return (
        <View style={ styles.tabsContainer }>
            <Tab value={ 0 } indicatorStyle={ styles.tabIndicator } disableIndicator={ true }>
                <Tab.Item 
                    title='My List' 
                    icon={ 
                        <ActivityIndicatorWrapper 
                            isLoading={ AUTH.isLoading }
                            component={
                                <MaterialCommunityIcon 
                                    name={ AUTH_PROFILE.my_list.find(movie => movie.id === movieID) ? 'check' : 'plus' }
                                    size={ 30 }
                                    color='white'
                                />
                            }
                        />
                    }
                    titleStyle={ styles.tabItemTitle  }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressAddToMyList }
                />

                <Tab.Item 
                    title='Like' 
                    icon={ 
                        <ActivityIndicatorWrapper 
                            isLoading={ AUTH.isLoading }
                            component={ 
                                <FontAwesome5 
                                    name='thumbs-up'
                                    size={ 30 }
                                    color='white'
                                    solid={ AUTH_PROFILE.liked_shows.find(movie => movie.id === movieID) }
                                />
                            }
                        />
                    }
                    titleStyle={ styles.tabItemTitle }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressLike }
                />

                <Tab.Item 
                    title='Share' 
                    icon={ 
                        <ActivityIndicatorWrapper 
                            isLoading={ AUTH.isLoading }
                            component={
                                <FeatherIcon 
                                    name='share-2'
                                    size={ 30 }
                                    color='white'
                                />
                            }
                        />
                    }
                    titleStyle={ styles.tabItemTitle }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressTabShare }
                />

            </Tab>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ActionButton)
