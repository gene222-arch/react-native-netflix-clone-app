import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import View from './../../../../../components/View';
import Text from './../../../../../components/Text';
import styles from './../../../../../assets/stylesheets/categories';
import CategoriesMenu from './../../home-components/CategoriesMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const NavBar = ({ selectedCategory }) => 
{
    const [ showCategories, setShowCategories ] = useState(false);

    const handleToggleCategories = () => setShowCategories(!showCategories);

    useEffect(() => {
        return () => {
            setShowCategories(false);
        }
    }, []);

    return (
        <View style={ styles.tabContainer }>
            <CategoriesMenu 
                isVisible={ showCategories } 
                setIsVisible={ setShowCategories }
                defaultCategory={ selectedCategory }
            />

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
