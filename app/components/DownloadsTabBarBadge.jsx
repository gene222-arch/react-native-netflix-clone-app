import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import Colors from './../constants/Colors';

const DownloadsTabBarBadge = ({ AUTH_PROFILE }) => 
{
    if (! AUTH_PROFILE?.has_new_downloads) {
        return ''
    }

    return (
        <Ionicon 
            name='checkmark-circle' 
            size={ 19 } 
            color={ Colors.info } 
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(DownloadsTabBarBadge)
