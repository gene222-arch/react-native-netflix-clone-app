import * as FileSystem from 'expo-file-system'
import { getExtension } from './file';


export const getCachedFile = (directory, fileName, URI) => {
    return `${ FileSystem.cacheDirectory }${ directory }${ fileName }.${ getExtension( URI ) }`;
}

export const cacheImage = async (uri, uniqueDocID, directory = '') => 
{
    const DIRECTORY = `${ FileSystem.cacheDirectory }${ directory }`;
    await ensureDirExists(DIRECTORY);

    const fileURI = `${ uniqueDocID.toString() }.${ getExtension(uri) }`;
    const fileToCache = DIRECTORY + fileURI;
    const isFileCached = await ensureFileExists(fileToCache);

    if (!isFileCached.exists) {
        await FileSystem
            .downloadAsync(uri, fileToCache)
            .then(({ uri }) => console.log(`${uri} Cached Successfully`))
            .then(err => console.log(err));
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
        // Create new directory
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    }
}

// Deletes whole giphy directory with all its content
export const deleteDirectory = async (directory) => {
    console.log(`Deleting all ${ directory } files...`);
    await FileSystem.deleteAsync(directory);
}