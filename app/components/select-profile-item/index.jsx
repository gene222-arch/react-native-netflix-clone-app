import React from 'react'
import { StyleSheet } from 'react-native'
import SelectProfileItem from './SelectProfileItem';
import AddProfile from './AddProfile';
import { createStructuredSelector } from 'reselect';
import { authSelector } from '../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const style = StyleSheet.create({
    img: {
        opacity: 1
    }
});

const DisplayProfile = ({ AUTH, isClickable, profile, handlePressSelectProfile, profileCountToDisable, profileLimit, availableProfile }) => 
{
    if (profile.id) {
        return (
            <SelectProfileItem 
                item={ profile } 
                handlePressSelectProfile={ handlePressSelectProfile } 
                isClickable={ isClickable }
                imageStyle={ style.img }
            />
        )
    }

    return (!Boolean(profileCountToDisable) && profileLimit > availableProfile) && 
        !['expired', 'cancelled', 'pending'].includes(AUTH.subscription_details.status) &&
        <AddProfile hasInternetConnection={ isClickable } />
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(DisplayProfile)
