import React from 'react'
import { Image as Image_ } from 'react-native-elements'

const Image = (props) => {
    return (
        <Image_
            loadingIndicatorSource={{ uri: 'https://i.stack.imgur.com/h6viz.gif' }}
            { ...props }
        />
    )
}

export default Image


