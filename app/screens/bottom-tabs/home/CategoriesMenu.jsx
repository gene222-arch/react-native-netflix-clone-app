import React from 'react'
import { BottomSheet, ListItem, Button } from 'react-native-elements';
import { TouchableOpacity, Modal } from 'react-native'
import styles from './../../../assets/stylesheets/appBarCategories';
import Colors from './../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import View from './../../../components/View';
import Text from './../../../components/Text';
import { FlatList } from 'react-native';
import categoriesConfig from './../../../config/home.menu.category.list'

const headerTitle = 'Categories';

const CategoriesMenu = ({ isVisible, setIsVisible }) => 
{
    const navigation = useNavigation();

    const handlePressNavigateToMyList = () => {
        setIsVisible(false);
        navigation.navigate('MyListScreen', { headerTitle });
    }

    const categories = categoriesConfig({
        homeOnPress: () => console.log('Home Menu Clicked'),
        myListOnPress: handlePressNavigateToMyList,
        categoryOnPress: () => console.log(`Other Categories Clicked!`)
    });

    return (
        <View style={ styles.container }>
            <Modal
                animationType="slide"
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
