
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
            title: CATEGORY_NAMES.HOME,
            isSelected: CATEGORY_NAMES.HOME === currentSelectedCategory,
            onPress: homeOnPress
        },
        {
            title: CATEGORY_NAMES.TV_SHOWS,
            isSelected: CATEGORY_NAMES.TV_SHOWS === currentSelectedCategory,
            onPress: tvShowsOnPress
        },
        {
            title: CATEGORY_NAMES.MOVIES,
            isSelected: CATEGORY_NAMES.MOVIES === currentSelectedCategory,
            onPress: moviesOnPress
        }
    ];
}