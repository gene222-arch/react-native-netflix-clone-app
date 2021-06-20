
export const CATEGORY_NAMES = 
{
    HOME: 'Home',
    TV_SHOWS: 'TV Shows',
    MOVIES: 'Movies'
}

export default ({ 
    currentSelectedCategory,
    homeOnPress, 
    tvShowsOnPress, 
    moviesOnPress,
}) => 
{
    return [
        {
            title: MAIN_CATEGORY_TYPES.HOME,
            isSelected: MAIN_CATEGORY_TYPES.HOME === currentSelectedCategory,
            onPress: homeOnPress
        },
        {
            title: MAIN_CATEGORY_TYPES.TV_SHOWS,
            isSelected: MAIN_CATEGORY_TYPES.TV_SHOWS === currentSelectedCategory,
            onPress: tvShowsOnPress
        },
        {
            title: MAIN_CATEGORY_TYPES.MOVIES,
            isSelected: MAIN_CATEGORY_TYPES.MOVIES === currentSelectedCategory,
            onPress: moviesOnPress
        }
    ];
}