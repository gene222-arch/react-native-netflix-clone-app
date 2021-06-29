import { Dimensions } from 'react-native';

const { width, height, scale, fontScale } = Dimensions.get('window');

export const DEVICE_WIDTH = width;

export const DEVICE_HEIGHT = height;

export const DEVICE_SCALE = scale;

export const DEVICE_FONT_SCALE = fontScale