import React, { useState } from 'react'
import { BottomSheet, ListItem, FAB } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native'
import styles from './../../../assets/stylesheets/appBarCategories';
import Colors from './../../../constants/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Categories = ({ isVisible, setIsVisible }) => 
{
    const list = 
    [
        { 
            title: 'Home',
            customStyle: {
                fontWeight: 'bold',
                fontSize: 24,
                color: Colors.white
            },
            onPress: () => console.log('Clicked')
        },
        { 
            title: 'My List',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Available for Download',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Action',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Anime',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Children and Family',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Comedies',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Critically Acclaimed',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Documentaries',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Dramas',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Fantasy',
            onPress: () => console.log('Clicked') 
        },
        {
            title: <FAB 
                        title="X" 
                        buttonStyle={ styles.closeBtn } 
                        titleStyle={ styles.closeBtnTitle }
                        containerStyle={ styles.closeBtnContainer }
                        onPress={ () => setIsVisible(false) }
                    />
        },
    ];
    
    return (
        <BottomSheet
            modalProps={{
                animationType: 'slide'
            }}
            isVisible={ isVisible }
            containerStyle={ styles.container }
        >
        {
            list.map((l, index) => (
                <TouchableOpacity key={ index } onPress={ l.onPress }>
                    <ListItem containerStyle={ styles.listContainer }>
                        <ListItem.Content style={ styles.listItemContent }>
                            <ListItem.Title style={[ styles.listTitle, l.customStyle ]}>{ l.title }</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
            ))
        }
        </BottomSheet>
    )
}

export default Categories
