import * as FileSystem from 'expo-file-system'
import { getExtension } from './file';


export const getCachedFile = (directory, fileName, URI) => {
    return `${ FileSystem.cacheDirectory }${ directory }${ fileName }.${ getExtension( URI ) }`;
}

export const cacheImage = async (uri, id, directory = '') => 
{
    try {
        const DIRECTORY = `${ FileSystem.cacheDirectory }${ directory }`;
        
        if (directory) {
            await ensureDirExists(DIRECTORY);
        }

        const fileToCacheURI = DIRECTORY + `${ id.toString() }.${ getExtension(uri) }`;
        const fileInfo = await ensureFileExists(fileToCacheURI);

        if (! fileInfo.exists) {
            await FileSystem.downloadAsync(uri, fileToCacheURI)
        } else {
            return fileInfo.uri;
        }
    } catch ({ message }) {
        console.log(message);
    }
}

export const ensureFileExists = async (fileURI) => await FileSystem.getInfoAsync(fileURI);

/**
 * Checks if directory exists. If not, create it
 * 
 * @param {string} directory 
 */
export const ensureDirExists = async (directory) => 
{
    const dirInfo = await FileSystem.getInfoAsync(directory);

    if (!dirInfo.exists) { 
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    }
}

// Deletes whole giphy directory with all its content
export const deleteDirectory = async (directory) => {
    console.log(`Deleting all ${ directory } files...`);
    await FileSystem.deleteAsync(directory);
}