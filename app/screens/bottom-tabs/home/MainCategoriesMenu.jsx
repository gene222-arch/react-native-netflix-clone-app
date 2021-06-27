import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { FAB } from 'react-native-elements'
import styles from './../../../assets/stylesheets/mainCategoriesMenu';
import View from './../../../components/View';
import Text from './../../../components/Text';
import AppBar from './../../AppBar';
import mainCategoriesConfig, { CATEGORY_NAMES } from './../../../config/home.menu.main.category.list'


const MainCategoriesMenu = ({ isVisible, setIsVisible, selectedMainCategory = '', handlePressChangeMainCategory }) =>
{
    const navigation = useNavigation();

    const handleChangeMainCategory = (category) => 
    {
        handlePressChangeMainCategory(category);
        setIsVisible(false);

        navigation.setOptions({ headerTitle: props => <AppBar showLogo={ false } headerTitle={ category } /> });
    }

    const mainCategories = mainCategoriesConfig({
        currentSelectedCategory: selectedMainCategory,
        homeOnPress: () => navigation.goBack(),
        tvShowsOnPress: () => handleChangeMainCategory(CATEGORY_NAMES.TV_SHOWS),
        moviesOnPress: () => handleChangeMainCategory(CATEGORY_NAMES.MOVIES)
    });

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
            >
                <View style={styles.modalContentContainer}>
                    <View style={styles.modalView}>
                        {
                            mainCategories.map(({ title, isSelected, onPress }, index) => (
                                <TouchableOpacity key={ index } onPress={ onPress } hitSlop={ styles.touchableHitSlop }>
                                    <Text 
                                        key={ index } 
                                        style={ isSelected ? styles.categoryNameSelected : styles.categoryNameDefault }
                                    >
                                        { title }
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                        <FAB 
                            title="X" 
                            style={ styles.floatingCloseBtn } 
                            color='white' titleStyle={ styles.floatingCloseBtnTitle } 
                            onPress={ () => setIsVisible(false) }
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default MainCategoriesMenu