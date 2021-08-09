import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { StyleSheet } from 'react-native'

const LoadingSpinner = ({ isLoading = true, message = '' }) => {
    return (
        <Spinner 
            visible={ isLoading }
            textStyle={ styles.spinnerTextStyle }
            size='large'
            textContent={ message }
        />
    )
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
        fontSize: 25
    }
});

export default LoadingSpinner
