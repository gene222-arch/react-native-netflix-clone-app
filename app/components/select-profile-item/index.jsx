import React from 'react'
import SelectProfileItem from './SelectProfileItem';
import AddProfile from './AddProfile';
import { createStructuredSelector } from 'reselect';
import { authSelector } from '../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const DisplayProfile = ({ AUTH, profile, handlePressSelectProfile, index }) => 
{
    const isProfileCountMaxed = (AUTH.profiles.length + 1) !== (index + 1);
    
    return isProfileCountMaxed
        ? <SelectProfileItem item={ profile } handlePressSelectProfile={ handlePressSelectProfile } />
        : <AddProfile />
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(DisplayProfile)
