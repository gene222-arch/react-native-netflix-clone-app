import React from 'react'
import { TouchableOpacity } from 'react-native'
import View from './View';
import Text from './Text';
import styles from './../assets/stylesheets/popUpDialog';
import { Overlay } from 'react-native-elements';

const PopUpDialog = ({ textQuery = 'Continue?', textCancel = 'Cancel', textConfirm = 'Confirm', isVisible = false, onBackdropPress, onPressCancel, onPressConfirm }) => {
    return (
        <Overlay 
            isVisible={ isVisible } 
            onBackdropPress={ onBackdropPress }
            overlayStyle={ styles.container }
        >
            <Text style={ styles.textQuery }>{ textQuery }</Text>
            <View style={ styles.actionBtn }>
                <TouchableOpacity onPress={ onPressCancel }>
                    <Text style={ styles.textCancel }>{ textCancel }</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ onPressConfirm }>
                    <Text style={ styles.textConfirm }>{ textConfirm }</Text>
                </TouchableOpacity>
            </View>
        </Overlay>
    )
}

export default PopUpDialog
