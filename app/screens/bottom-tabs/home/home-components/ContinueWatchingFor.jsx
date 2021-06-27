import React from 'react'
import { FlatList } from 'react-native'
import View from '../../../../components/View';
import Text from '../../../../components/Text';
import styles from './../../../../assets/stylesheets/continueWatchingForItem';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import ContinueWatchingForItem from './../../../../components/continue-watching-for-item/ContinueWatchingForItem';

const ContinueWatchingFor = ({ 
    AUTH,
    handleToggleRateRecentlyWatchedShow,
    handlePressRemoveRecentlyWatchedShow 
}) => {

    return AUTH.recentlyWatchedShows.length > 0 && (
        <View style={ styles.container }>
            <Text h4>Continue Watching For { AUTH.profile.name }</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString()}
                data={ AUTH.recentlyWatchedShows }
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
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(ContinueWatchingFor)
