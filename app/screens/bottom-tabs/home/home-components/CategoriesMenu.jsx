import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity, Modal } from 'react-native'
import styles from './../../../../assets/stylesheets/appBarCategories';
import { useNavigation } from '@react-navigation/native';
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import { FlatList } from 'react-native';
import categoriesConfig, { CATEGORY_NAMES } from './../../../../config/home.menu.category.list'


const CategoriesMenu = ({ isVisible, setIsVisible }) => 
{
    const navigation = useNavigation();
    const [ selectedCategory, setSelectedCategory ] = useState('Home');

    const handlePressNavigateToMyList = () => 
    {
        setSelectedCategory('My List');
        setIsVisible(false);
        navigation.navigate('MyListScreen', { headerTitle: 'Categories' });
    }

    const handlePressCategoryOnChange = (category) => 
    {
        setSelectedCategory(category);
        setIsVisible(false);
        navigation.navigate('CategoriesScreen', { headerTitle: category });
    }

    const handlePressHome = () => 
    {
        setSelectedCategory('Home');
        setIsVisible(false);
        navigation.navigate('Home');
    }

    const menuList = categoriesConfig({
        homeOnPress: handlePressHome,
        myListOnPress: handlePressNavigateToMyList,
        availableForDownloadOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.AVAILABLE_FOR_DOWNLOAD),
        animationOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.ANIME),
        animeOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.ANIME),
        actionOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.ACTION),
        childrenAndFamilyOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.CHILDREN_AND_FAMILY),
        comedyOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.COMEDY),
        crimeOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.CRIME),
        dramaOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.DRAMA),
        fantasyOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.FANTASY),
        horrorOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.HORROR),
        historyOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.HISTORY),
        romanceOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.ROMANCE),
        romanticComedyOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.ROMANTICE_COMEDY),
        sportsOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.SUSPENSE),
        suspenseOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.SUSPENSE),
        thrillerOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.THRILLER),
    });

    useEffect(() => {
        return () => {
            setSelectedCategory('Home');
        }
    }, []);

    return (
        <View style={ styles.container }>
            { isVisible && <StatusBar backgroundColor='rgba(0, 0, 0, .8)' />}
            <Modal
                animationType='slide'
                transparent={true}
                visible={isVisible}
            >
                <View style={ styles.modalContainer }>
                    <FlatList 
                        keyExtractor={ ({ title }) => title }
                        data={ menuList }
                        renderItem={ ({ item: { onPress, title } }) => (
                            <TouchableOpacity onPress={ onPress }>
                                <Text style={
                                    title === selectedCategory 
                                        ? styles.selectedCategory
                                        : styles.categoriesTxt
                                }> { title }</Text>
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={ false }
                        showsVerticalScrollIndicator={ false }
                    />
                    <Button
                        title='X'
                        buttonStyle={ styles.closeBtn }
                        containerStyle={ styles.closeBtnContainer }
                        titleStyle={ styles.closeBtnTitle }
                        onPress={ () => setIsVisible(false) }
                    />
                </View>
            </Modal>
        </View>
    )
}

export default CategoriesMenu
