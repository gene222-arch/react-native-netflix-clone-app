import React, { useState, useRef } from 'react';
import { Alert, Modal, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-elements'
import styles from './../../../assets/stylesheets/mainCategoriesMenu';
import View from './../../../components/View';
import Text from './../../../components/Text';
import { useNavigation } from '@react-navigation/native'

const MAIN_CATEGORY_TYPES = {
    HOME: 'Home',
    TV_SHOWS: 'TV Shows',
    MOVIES: 'Movies'
}

const MainCategoriesMenu = ({ isVisible, setIsVisible, selectedMainCategory = '', setMainCategory }) =>
{
    const modalRef = useRef(selectedMainCategory);
    const navigation = useNavigation();

    const handleChangeMainCategory = (category) => 
    {
        setMainCategory(category);
        setIsVisible(false);

        modalRef.current = category;
    }

    const mainCategories =
    [
        {
            title: MAIN_CATEGORY_TYPES.HOME,
            isSelected: MAIN_CATEGORY_TYPES.HOME === modalRef.current,
            onPress: () => navigation.goBack()
        },
        {
            title: MAIN_CATEGORY_TYPES.TV_SHOWS,
            isSelected: MAIN_CATEGORY_TYPES.TV_SHOWS === modalRef.current,
            onPress: () => handleChangeMainCategory(MAIN_CATEGORY_TYPES.TV_SHOWS)
        },
        {
            title: MAIN_CATEGORY_TYPES.MOVIES,
            isSelected: MAIN_CATEGORY_TYPES.MOVIES === modalRef.current,
            onPress: () => handleChangeMainCategory(MAIN_CATEGORY_TYPES.MOVIES)
        }
    ];

    return (
        <View style={styles.centeredView}>
            <Modal
                ref={ modalRef }
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