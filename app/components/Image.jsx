import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Image as DefaultImage } from 'react-native-elements'

const Image = (props) => <DefaultImage {...props} PlaceholderContent={ <ActivityIndicator /> }/>

export default Image


