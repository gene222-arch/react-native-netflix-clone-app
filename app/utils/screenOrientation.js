import * as ScreenOrientation from 'expo-screen-orientation';

export const currentScreenOrientation = async () => {
    return await ScreenOrientation
        .getOrientationAsync()
        .then(res => res === 1 ? 'PORTRAIT' : 'LANDSCAPE')
        .catch(err => console.log(err))
}
