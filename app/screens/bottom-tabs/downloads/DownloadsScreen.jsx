import React from 'react'
import styles from './../../../assets/stylesheets/downloads';
import View from './../../../components/View';
import Text from './../../../components/Text';
import { FlatList } from 'react-native-gesture-handler';
import downloads from './../../../services/data/downloads';
import DownloadItem from '../../../components/download-item/DownloadItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-elements';

const DownloadsScreen = () => {
    return (
        <View style={ styles.container }>
            <View>
                <Text h4>Download's for you</Text>
                <View style={ styles.lastUpdateContainer }>
                    <FeatherIcon 
                        name='clock'
                        size={ 14 }
                        color='#fff'
                        style={ styles.lastUpdateIcon }
                    />
                    <Text style={ styles.lastUpdateText }>Updated 7 hours ago</Text>
                </View>
            </View>
            <FlatList 
                data={ downloads }
                renderItem={ ({ item }) => (
                    <DownloadItem 
                        downloadedVideo={ item } 
                        onPress={ () => console.log(`Playing ${ item.title }`) }
                    />
                )}
            />
            <View style={ styles.queryContainer }>
                <Button 
                    title='Find Something to Download'
                    titleStyle={ styles.queryBtnTitle }
                    buttonStyle={ styles.queryBtn }
                />
            </View>
        </View>
    )
}

export default DownloadsScreen
