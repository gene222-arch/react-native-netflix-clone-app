import React from 'react'
import View from './../../../../components/View';
import Header from './Header';
import PlayDownloadButton from './PlayDownloadButton';
import MovieDescription from './MovieDescription';
import ActionButton from './../../../../components/ActionButton';
import PaginationPicker from './PaginationPicker';
import styles from './../../../../assets/stylesheets/movieDetail';

const ListHeader = ({ movie, videoStatus, handlePressPauseVideo, handlePressPlayVideo, hasLikedMovie, pages, selectedPage, handleChangePage  }) => {
    return (
        <View style={ styles.movieContainer }>
            <Header movie={ movie } />
            <PlayDownloadButton
                videoStatus={ videoStatus }
                handlePressPauseVideo={ handlePressPauseVideo }
                handlePressPlayVideo={ handlePressPlayVideo }
            />
            <MovieDescription movie={ movie } />
            <ActionButton movie={ movie } hasLikedMovie={ hasLikedMovie } />
            <PaginationPicker 
                pages={ pages }
                selectedPage={ selectedPage } 
                handleChangePage={ handleChangePage }
            />
        </View>
    )
}

export default ListHeader
