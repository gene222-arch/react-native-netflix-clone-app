import React, { useState } from 'react';
import { Alert, Modal, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-elements'
import styles from './../../../assets/stylesheets/mainCategoriesMenu';
import View from './../../../components/View';
import Text from './../../../components/Text';

const MAIN_CATEGORY_TYPES = {
    HOME: 'Home',
    TV_SHOWS: 'TV Shows',
    MOVIES: 'Movies'
}

const MainCategoriesMenu = ({ isVisible, setIsVisible, selectedMainCategory = '', setMainCategory }) =>
{
    const mainCategories =
    [
        {
            title: MAIN_CATEGORY_TYPES.HOME,
            isSelected: MAIN_CATEGORY_TYPES.HOME === selectedMainCategory,
            onPress: () => console.log('Clciked')
        },
        {
            title: MAIN_CATEGORY_TYPES.TV_SHOWS,
            isSelected: MAIN_CATEGORY_TYPES.TV_SHOWS === selectedMainCategory,
            onPress: () => console.log('Clciked')
        },
        {
            title: MAIN_CATEGORY_TYPES.MOVIES,
            isSelected: MAIN_CATEGORY_TYPES.MOVIES === selectedMainCategory,
            onPress: () => console.log('Clciked')
        }
    ];

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
                <View style={styles.modalContentContainer}>
                    <View style={styles.modalView}>
                        {
                            mainCategories.map(({ title, isSelected, onPress }, index) => (
                                <TouchableOpacity onPress={ onPress } hitSlop={ styles.touchableHitSlop }>
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