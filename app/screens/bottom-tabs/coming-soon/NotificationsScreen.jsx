import React from 'react'
import View from './../../../components/View';
import { StyleSheet, FlatList } from 'react-native'
import NotificationItem from '../../../components/coming-soon-screen/NotificationItem';

const NotificationsScreen = () => 
{
    return (
        <View style={ styles.container }>
            <FlatList 
                keyExtractor={ (item, index) => index.toString() }
                data={[0, 1, 2, 2, 2, 2, 2]}
                renderItem={ ({ item }) => <NotificationItem /> }
                showsHorizontalScrollIndicator={ false }
                showsVerticalScrollIndicator={ false }
            />
        </View>
    )
}

export default NotificationsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    }
});