import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { createStructuredSelector } from 'reselect';
import { authSelector } from '../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native'

const LoadingSpinner = ({ AUTH }) => {
    return (
        <Spinner 
            visible={ AUTH.isLoading }
            textStyle={ styles.spinnerTextStyle }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    }
});

export default connect(mapStateToProps)(LoadingSpinner)
