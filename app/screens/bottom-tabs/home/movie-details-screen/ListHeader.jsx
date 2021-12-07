import React from 'react'
import View from './../../../../components/View';
import Header from './Header';
import MovieDetailPlayButton from './MovieDetailPlayButton';
import MovieDescription from './MovieDescription';
import ActionButton from './../../../../components/ActionButton';
import PaginationPicker from './PaginationPicker';
import styles from './../../../../assets/stylesheets/movieDetail';
import Text from './../../../../components/Text';

const ListHeader = ({ 
    movie, 
    videoStatus, 
    isResumable,
    handlePressPauseVideo, 
    handlePressPlayVideo,  
    pages, 
    selectedPage, 
    handleChangePage,
    hasSimilarMovies
}) => {
    return (
        <View style={ styles.movieContainer }>
            <Header movie={ movie } />
            <MovieDetailPlayButton
                isResumable={ isResumable }
                videoStatus={ videoStatus }
                handlePressPauseVideo={ handlePressPauseVideo }
                handlePressPlayVideo={ handlePressPlayVideo }
            />
            <MovieDescription movie={ movie } />
            <ActionButton movie={ movie } />
            { hasSimilarMovies && <Text style={ styles.similarMoviesText }>Similar Movies</Text> }
            {
                pages > 1 && (
                    <PaginationPicker 
                        pages={ pages }
                        selectedPage={ selectedPage } 
                        handleChangePage={ handleChangePage }
                    />
                )
            }
        </View>
    )
}

export default ListHeader
