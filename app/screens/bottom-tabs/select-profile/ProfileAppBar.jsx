import React from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import styles from '../../../assets/stylesheets/profileAppBar';
import { TouchableOpacity } from 'react-native';
import StackNavBackButton from '../../../components/stack-app-bar/StackNavBackButton';
import { createStructuredSelector } from 'reselect';
import { authSelector } from '../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const ProfileAppBar = ({ AUTH, onPress, headerTitle = '', showSaveButton = true, onBackArrowClick, ...props }) => 
{
    return (
        <View style={ styles.container }>
            <View style={ styles.backButtonContainer }>
                <StackNavBackButton isLoading={ AUTH.isLoading } onBackArrowClick={ onBackArrowClick } />
                <Text style={ styles.headerTitle }>{ headerTitle }</Text>
            </View>
            {
                showSaveButton && (
                    <TouchableOpacity onPress={ onPress } disabled={ AUTH.isLoading } >
                        <Text style={ styles.saveText }>{ AUTH.isLoading ? 'Saving' : 'Save' }</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
})

export default connect(mapStateToProps)(ProfileAppBar)
