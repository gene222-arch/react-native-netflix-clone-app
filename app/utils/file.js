const EXT_TYPES = [
    'jpg',
    'jpeg',
    'png',
    'mp4',
    'mp3',
    'gif',
    'svg'
];

export const getExtension = (string) => {
    let ext = string.split('.').pop();

    EXT_TYPES.forEach(extType => {
        if (ext.includes(extType)) {
            ext = extType; 
        }
    });

    return ext;
}