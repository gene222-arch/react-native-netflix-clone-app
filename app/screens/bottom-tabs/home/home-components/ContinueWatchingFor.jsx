import React from 'react'
import { FlatList } from 'react-native'
import View from '../../../../components/View';
import Text from '../../../../components/Text';
import styles from './../../../../assets/stylesheets/continueWatchingForItem';
import { createStructuredSelector } from 'reselect';
import { authSelector, authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import ContinueWatchingForItem from './../../../../components/continue-watching-for-item/ContinueWatchingForItem';

const ContinueWatchingFor = ({ 
    AUTH,
    AUTH_PROFILE,
    handleToggleRateRecentlyWatchedShow,
    handlePressRemoveRecentlyWatchedShow 
}) => {

    const hasRecentlyWatchedShows = (AUTH_PROFILE.recently_watched_shows.length > 0);
    
    if (!hasRecentlyWatchedShows) {
        return <Text h4>Your recently watched show's will be shown here.</Text>
    }

    return (
        <View style={ styles.container }>
            <Text h4>Continue Watching For { AUTH_PROFILE.name }</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString()}
                data={ AUTH_PROFILE.recently_watched_shows }
                renderItem={({ item }) =>  (
                    <ContinueWatchingForItem 
                        episode={ item } 
                        handleToggleLikeRecentlyWatchedShow={ () => handleToggleRateRecentlyWatchedShow(item, 'like') }
                        handleToggleUnLikeRecentlyWatchedShow={ () => handleToggleRateRecentlyWatchedShow(item, 'not for me') }
                        handlePressRemoveRecentlyWatchedShow={ () => handlePressRemoveRecentlyWatchedShow(item.id) }
                    />
                )}
                horizontal
            />    
        </View>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ContinueWatchingFor)
