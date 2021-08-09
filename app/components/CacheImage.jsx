import React, { useEffect, useState, useRef } from 'react'
import { Image } from 'react-native'
import * as FileSystem from 'expo-file-system'

const CacheImage = ({ uri, ...props }) => 
{
    const [imgURI, setImgURI] = useState(uri)
    const componentIsMounted = useRef(true)

    const loadImage = async ({ fileURI }) => 
    {
        try {
            // Use the cached image if it exists
            const metadata = await FileSystem.getInfoAsync(fileURI);

            if (!metadata.exists) {
                // download to cache
                if (componentIsMounted.current) {
                    setImgURI(null);
                    await FileSystem.downloadAsync(uri, fileURI);
                }
                if (componentIsMounted.current) {
                    setImgURI(fileURI);
                }
            }
        } catch (err) {
            console.log(err); // eslint-disable-line no-console
            setImgURI(uri);
        }
      }

    useEffect(() => {
        loadImage({ fileURI: uri })
    
        return () => {
            componentIsMounted.current = false
        }
    }, []);
  
    return (
        <Image
            {...props}
            source={{
                uri: imgURI,
            }}
        />
    )
  }

export default CacheImage


