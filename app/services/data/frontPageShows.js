import DR_STONE_BG from './../../assets/images/front-page/dr-stone.jpg'
import DR_STONE_TITLE from './../../assets/images/front-page/dr-stone-title.png'
import THE_WITCHER_BG from './../../assets/images/front-page/the-witcher.jpg'
import THE_WITCHER_TITLE from './../../assets/images/front-page/the-witcher-title.png'
import END_GAME_BG from './../../assets/images/front-page/end-game.jpg'
import END_GAME_TITLE from './../../assets/images/front-page/end-game-title.png'

const frontPageShows = 
[
    {
        id: 1,
        category: 'anime',
        title: 'Dr. Stone',
        backgroundImage: DR_STONE_BG,
        poster: DR_STONE_TITLE,
        tags: [
            'Exciting',
            'Sci-Fi Anime',
            'Wilderness Survival',
            'Japanese'
        ],
        isAddedToMyList: false
    },
    {
        id: 2,
        category: 'TV Shows',
        title: 'The Witcher',
        backgroundImage: THE_WITCHER_BG,
        poster: THE_WITCHER_TITLE,
        tags: [
            'Dark Fantasy',
            'Science Fiction',
            'Mystery',
            'High fantasy',
            'Comics'
        ],
        isAddedToMyList: false
    },
    {
        id: 3,
        category: 'Movies',
        title: 'The Avengers: End Game',
        backgroundImage: END_GAME_BG,
        poster: END_GAME_TITLE,
        tags: [
            'Action',
            'Adventure',
            'Superhero',
            'Science Fiction',
            'Fantasy'
        ],
        isAddedToMyList: false
    },
];

export default frontPageShows