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

const DisplayProfile = ({ isClickable, profile, handlePressSelectProfile, profileCountToDisable }) => 
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

    return !Boolean(profileCountToDisable) && <AddProfile hasInternetConnection={ isClickable } />
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(DisplayProfile)
