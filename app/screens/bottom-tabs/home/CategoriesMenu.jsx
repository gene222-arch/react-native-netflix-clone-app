import React from 'react'
import { BottomSheet, ListItem, Button } from 'react-native-elements';
import { TouchableOpacity, Modal } from 'react-native'
import styles from './../../../assets/stylesheets/appBarCategories';
import Colors from './../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import View from './../../../components/View';
import Text from './../../../components/Text';
import { FlatList } from 'react-native';
import categoriesConfig, { CATEGORY_NAMES } from './../../../config/home.menu.category.list'


const CategoriesMenu = ({ isVisible, setIsVisible, selectedMainCategory, handlePressChangeMainCategory }) => 
{
    const navigation = useNavigation();

    const handlePressNavigateToMyList = () => {
        setIsVisible(false);
        navigation.navigate('MyListScreen', { headerTitle: selectedMainCategory });
    }

    const handlePressCategoryOnChange = (category) => {
        handlePressChangeMainCategory(category);
        setIsVisible(false);
    }

    const categories = categoriesConfig({
        homeOnPress: () => console.log('Home Menu Clicked'),
        myListOnPress: handlePressNavigateToMyList,
        availableForDownloadOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.AVAILABLE_FOR_DOWNLOAD),
        actionOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.ACTION),
        animeOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.ANIME),
        childrenAndFamilyOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.CHILDREN_AND_FAMILY),
        comediesOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.COMEDIES),
        criticallyAcclaimedOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.CRITICALLY_ACCLAIMED),
        dramaOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.DRAMAS),
        fantasyOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.FANTASY),
        horrorOnPress: () => handlePressCategoryOnChange(CATEGORY_NAMES.HORROR),
    });

    return (
        <View style={ styles.container }>
            <Modal
                animationType='slide'
                transparent={true}
                visible={isVisible}
            >
                <View style={ styles.modalContainer }>
                    <FlatList 
                        keyExtractor={ ({ title }) => title }
                        data={ categories }
                        renderItem={ ({ item }) => (
                            <TouchableOpacity onPress={ item.onPress }>
                                <Text style={ styles.categoriesTxt }> { item.title }</Text>
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
