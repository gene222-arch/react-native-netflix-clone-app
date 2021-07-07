import { Platform, StatusBar } from 'react-native';

export const GLOBAL_MARGIN_TOP = Platform.OS === 'android' ? StatusBar.currentHeight : 0;