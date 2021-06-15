import * as FileSystem from 'expo-file-system'
import { getExtension } from './file';

export const cacheImage = async (uri, uniqueDocID) => 
{
    return await FileSystem.downloadAsync(
        uri,
        `${ FileSystem.documentDirectory }${ uniqueDocID.toString() }.${ getExtension(uri) }`
    )
    .then(({ uri }) => console.log(`${ uri } Assets Cached Successfully`))
    .catch(reason => console.log(reason));
}