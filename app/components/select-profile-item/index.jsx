import React from 'react'
import { StyleSheet } from 'react-native'
import SelectProfileItem from './SelectProfileItem';
import AddProfile from './AddProfile';
import { createStructuredSelector } from 'reselect';
import { authSelector } from '../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const MAX_NUMBER_OF_USER_PROFILES = 5;

const style = StyleSheet.create({
    img: {
        opacity: 1
    }
})

const DisplayProfile = ({ AUTH, profile, handlePressSelectProfile, index }) => 
{
    const isProfileCountMaxed = AUTH.profiles.length === index;
    
    if (! isProfileCountMaxed) {
        return (
            <SelectProfileItem 
                item={ profile } 
                handlePressSelectProfile={ handlePressSelectProfile } 
                imageStyle={ style.img }
            />
        )
    }

    return (! isProfileCountMaxed) && <AddProfile />
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(DisplayProfile)
