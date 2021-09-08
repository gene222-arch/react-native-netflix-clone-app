import React from 'react'
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

    const handlePressNavigateToMyList = () => {
        setIsVisible(false);
        navigation.navigate('MyListScreen', { headerTitle: 'Categories' });
    }

    const handlePressCategoryOnChange = (category) => {
        setIsVisible(false);
        navigation.navigate('CategoriesScreen', { headerTitle: category });
    }

    const handlePressHome = () => {
        setIsVisible(false);
        navigation.navigate('Home');
    }

    const menuList = categoriesConfig({
        homeOnPress: handlePressHome,
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
