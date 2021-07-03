import React, { useEffect } from 'react'
import { Modal } from 'react-native'
import View from './View';
import Text from './Text';
import styles from './../assets/stylesheets/snackbar';

const SnackBar = ({ isVisible, closeSnackBar, message }) => 
{

    useEffect(() => {
        if (isVisible) {
            setTimeout(() => closeSnackBar(), 6000);
        }
    }, []);

    return (
        <Modal
            animationType='slide'
            transparent={ true }
            visible={ isVisible }
            style={ styles.container }
        >
            <View style={ styles.messageContainer }>
                <Text style={ styles.message }>{ message }</Text>
            </View>
        </Modal>
    )
}

export default SnackBar
