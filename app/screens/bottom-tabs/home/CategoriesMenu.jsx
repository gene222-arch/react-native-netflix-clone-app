import React, { useState, useEffect, useRef } from 'react'
import { BottomSheet, ListItem, FAB, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native'
import styles from './../../../assets/stylesheets/appBarCategories';
import Colors from './../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import View from './../../../components/View';


const DisplayCategory = ({ category }) => {
    return (
        <TouchableOpacity onPress={ category.onPress }>
            <ListItem containerStyle={[ styles.listContainer, category.containerStyle ]}>
                <ListItem.Content style={ styles.listItemContent }>
                    <ListItem.Title style={[ styles.listTitle, category.customStyle ]}>{ category.title }</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )
}

const CategoriesMenu = ({ isVisible, setIsVisible }) => 
{
    console.log('CATEGORY MENU RENDER');
    const navigation = useNavigation();

    const headerTitle = 'Categories';

    const orientationRef = useRef('PORTRAIT');
    const handlePressNavigateToMyList = () => {
        setIsVisible(false);
        navigation.navigate('MyListScreen', { headerTitle });
    }

    const categories = 
    [
        { 
            title: 'Home',
            customStyle: {
                fontWeight: 'bold',
                fontSize: 24,
                color: Colors.white,
                marginTop: 80,
            },
            onPress: () => console.log('Clicked')
        },
        { 
            title: 'My List',
            onPress: handlePressNavigateToMyList
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
            title: 'Horror',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Trending',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Kids',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Science Fiction',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Detective',
            onPress: () => console.log('Clicked') 
        }
    ];

    return (
        <View style={ styles.container }>
            <BottomSheet
                modalProps={{
                    animationType: 'slide'
                }}
                isVisible={ isVisible }
                containerStyle={ styles.bottomSheetContainer }
            >
                {
                    categories.map((category, index) => <DisplayCategory key={ index } category={ category }/>)
                }
                <Button
                    title='X'
                    buttonStyle={ styles.closeBtn }
                    containerStyle={ styles.closeBtnContainerPortrait }
                    titleStyle={ styles.closeBtnTitle }
                    onPress={ () => setIsVisible(false) }
                />
            </BottomSheet>
        </View>
    )
}

export default CategoriesMenu
