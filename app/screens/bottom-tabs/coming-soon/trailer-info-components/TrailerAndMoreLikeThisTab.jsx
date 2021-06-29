import React from 'react'
import { Tab } from 'react-native-elements'
import styles from './../../../../assets/stylesheets/trailerInfo';
import View from './../../../../components/View';
import Text from './../../../../components/Text';

const TrailerAndMoreLikeThisTab = ({ selectedTabCategory, setSelectedTabCategory }) => 
{
    return (
        <View style={ styles.tabCategoryContainer }>
            <Tab value={ selectedTabCategory } indicatorStyle={ styles.tabIndicator }>
                <Tab.Item 
                    title={ 
                        <Text style={ selectedTabCategory === 0 ? styles.tabCategoryTitleSelected : styles.tabCategoryTitle }>
                            MORE LIKE THIS
                        </Text> 
                    } 
                    onPressIn={ () => setSelectedTabCategory(0) } 
                    titleStyle={ styles.tabTitle }
                    containerStyle={ styles.tabItemContainer }
                />
                <Tab.Item 
                    title={ 
                        <Text style={ selectedTabCategory === 1 ? styles.tabCategoryTitleSelected : styles.tabCategoryTitle }>
                            TRAILERS & MORE
                        </Text> 
                    } 
                    onPressIn={ () => setSelectedTabCategory(1) } 
                    titleStyle={ styles.tabTitle }
                    containerStyle={ styles.tabItemContainer }
                />
            </Tab>
        </View>
    )
}

export default TrailerAndMoreLikeThisTab
