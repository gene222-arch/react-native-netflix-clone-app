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
})

const DisplayProfile = ({ networkState, profile, handlePressSelectProfile, index }) => 
{
    if (profile.id) {
        return (
            <SelectProfileItem 
                item={ profile } 
                handlePressSelectProfile={ handlePressSelectProfile } 
                hasInternetConnection={ networkState.isConnected }
                imageStyle={ style.img }
            />
        )
    }

    return <AddProfile hasInternetConnection={ networkState.isConnected } />
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(DisplayProfile)
