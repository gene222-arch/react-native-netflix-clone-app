import * as FileSystem from 'expo-file-system'

const EXT_TYPES = [
    'jpg',
    'jpeg',
    'png',
    'mp4',
    'mp3',
    'gif',
    'svg'
];

export const getExtension = (string) => 
{
    let ext = string.split('.').pop();

    EXT_TYPES.forEach(extType => {
        if (ext.includes(extType)) {
            ext = extType; 
        }
    });

    return ext;
}

export const formatBytes = (bytes, decimal = 2) => {
    if (bytes === 0) return '0 Bytes';

    const K = 1024;
    const DM = decimal < 0 ? 0 : decimal;
    const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const sizeIndex = Math.floor(Math.log(bytes) / Math.log(K));
    const size = SIZES[sizeIndex];

    return `${ parseFloat((bytes / Math.pow(K, size)).toFixed(DM)) } ${ size }`;
}

export const getDownloadedVideo = (videoURI, title, id) => `${ FileSystem.documentDirectory }${ title }${ id }.${ getExtension(videoURI) }`;

export const getDownloadedVideoFileInfo = async (fileURI) => {
    return await FileSystem.getInfoAsync(fileURI)
        .then(res => res)
        .catch(reason => console.log(reason));
}


  
