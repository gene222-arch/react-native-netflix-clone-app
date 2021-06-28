import React from 'react'
import { Image as DefaultImage } from 'react-native-elements'

const Image = (props) => (
    <DefaultImage 
        {...props}
        loadingIndicatorSource={{ uri: 'https://i.stack.imgur.com/h6viz.gif' }}
    />
)

export default Image


