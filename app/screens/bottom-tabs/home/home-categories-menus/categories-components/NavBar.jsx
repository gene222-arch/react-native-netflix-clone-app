import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import View from './../../../../../components/View';
import Text from './../../../../../components/Text';
import styles from './../../../../../assets/stylesheets/categories';
import CategoriesMenu from './../../home-components/CategoriesMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainCategoriesMenu from './../../home-components/MainCategoriesMenu';


const NavBar = ({ selectedMainCategory, handlePressChangeMainCategory }) => 
{
    const [ showCategories, setShowCategories ] = useState(false);
    const [ showMainCategories, setShowMainCategories ] = useState(false);

    const handleToggleMainCategories = () => setShowMainCategories(!showMainCategories);

    const handleToggleCategories = () => setShowCategories(!showCategories);

    useEffect(() => {
        return () => {
            setShowCategories(false);
            setShowMainCategories(false);
        }
    }, []);

    return (
        <View style={ styles.tabContainer }>
            <MainCategoriesMenu 
                isVisible={ showMainCategories } 
                setIsVisible={ setShowMainCategories } 
                selectedMainCategory={ selectedMainCategory }
                handlePressChangeMainCategory={ handlePressChangeMainCategory }
            />

            <CategoriesMenu 
                isVisible={ showCategories } 
                setIsVisible={ setShowCategories }
                selectedMainCategory={ selectedMainCategory }
                handlePressChangeMainCategory={ handlePressChangeMainCategory }
            />
            
            {/* Main Categories */}
            {/* <TouchableOpacity onPress={ handleToggleMainCategories }>
                <View style={ styles.categoriesContainer }>
                    <Text style={styles.tabItemMainCategories}>{ selectedMainCategory }</Text>
                    <FontAwesome5 
                        name='sort-down'
                        size={ 12 }
                        color='#fff'
                        style={ styles.categoriesIcon }
                    />
                </View>
            </TouchableOpacity> */}

            {/* All Categories */}
            <TouchableOpacity onPress={ handleToggleCategories }>
                <View style={ styles.categoriesContainer }>
                    <Text style={ styles.tabItemAllCategories }>All Categories</Text>
                    <FontAwesome5 
                        name='sort-down'
                        size={ 12 }
                        color='#fff'
                        style={ styles.categoriesIcon }
                    />
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default NavBar
