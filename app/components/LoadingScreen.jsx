import React from 'react'
import View from './View';
import Text from './Text';
import styles from './../assets/stylesheets/loading';

const LoadingScreen = () => {
    return (
        <View style={ styles.container }>
            <Text>Loading ...</Text>
        </View>
    )
}

export default LoadingScreen
