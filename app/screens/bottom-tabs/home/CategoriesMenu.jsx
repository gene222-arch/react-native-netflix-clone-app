import React from 'react'
import { BottomSheet, ListItem, Button } from 'react-native-elements';
import { TouchableOpacity, Modal } from 'react-native'
import styles from './../../../assets/stylesheets/appBarCategories';
import Colors from './../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import View from './../../../components/View';
import Text from './../../../components/Text';
import { FlatList } from 'react-native';


const headerTitle = 'Categories';

const CategoriesMenu = ({ isVisible, setIsVisible }) => 
{
    const navigation = useNavigation();

    const handlePressNavigateToMyList = () => {
        setIsVisible(false);
        navigation.navigate('MyListScreen', { headerTitle });
    }

    const categories = 
    [
        { 
            title: 'Home',
            customStyle: {
                fontWeight: 'bold',
                fontSize: 24,
                color: Colors.white,
                marginTop: 80,
            },
            onPress: () => console.log('Clicked')
        },
        { 
            title: 'My List',
            onPress: handlePressNavigateToMyList
        },
        { 
            title: 'Available for Download',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Action',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Anime',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Children and Family',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Comedies',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Critically Acclaimed',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Documentaries',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Dramas',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Fantasy',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Horror',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Trending',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Kids',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Science Fiction',
            onPress: () => console.log('Clicked') 
        },
        { 
            title: 'Detective',
            onPress: () => console.log('Clicked') 
        }
    ];

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
