import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import styles from './../../../../assets/stylesheets/homeScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CategoriesMenu from './CategoriesMenu';
import FadeInOutView from './../../../../components/animated/FadeInOutView';

const NavBar = () => 
{
    const [ showCategories, setShowCategories ] = useState(false);

    const handleToggleCategories = () => setShowCategories(!showCategories);

    useEffect(() => {
        return () => {
            setShowCategories(false);
        }
    }, []);

    return (
        <FadeInOutView>
            <CategoriesMenu isVisible={ showCategories } setIsVisible={ setShowCategories }/>
            <View style={ styles.tabContainer }> 
                <TouchableOpacity onPress={ handleToggleCategories }>
                    <View style={ styles.categoriesContainer }>
                        <Text style={ styles.tabItem }>Categories</Text>
                        <FontAwesome5 
                            name='sort-down'
                            size={ 12 }
                            color='#fff'
                            style={ styles.categoriesIcon }
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </FadeInOutView>
    )
}

export default NavBar
