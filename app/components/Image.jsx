import React from 'react'
import { Image } from 'react-native-elements'

const Image_ = (props) => {
    return (
        <Image 
            loadingIndicatorSource={{ uri: 'https://i.stack.imgur.com/h6viz.gif' }}
            { ...props }
        />
    )
}

export default Image_


