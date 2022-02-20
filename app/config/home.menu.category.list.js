import Colors from './../constants/Colors';

export const CATEGORY_NAMES = 
{
    HOME: 'Home',
    MY_LIST: 'My List',
    ADVENTURE: 'Adventure',
    ANIMATION: 'Animation',
    ANIME: 'Anime',
    ACTION: 'Action',
    CHILDREN_AND_FAMILY: 'Children and Family',
    COMEDY: 'Comedy',
    CRIME: 'Crime',
    DOCUMENTARY: 'Documentary',
    DRAMA: 'Drama',
    FANTASY: 'Fantasy',
    HORROR: 'Horror',
    HISTORY: 'History',
    ROMANCE: 'Romance',
    ROMANTICE_COMEDY: 'Romantic Comedy',
    SPORTS: 'Sports',
    SUSPENSE: 'Suspense',
    THRILLER: 'Thriller',

};

export default ({ 
    homeOnPress, 
    myListOnPress, 
    animationOnPress,
    animeOnPress,
    adventureOnPress,
    actionOnPress,
    childrenAndFamilyOnPress,
    comedyOnPress,
    crimeOnPress,
    documentaryOnPress,
    dramaOnPress,
    fantasyOnPress,
    horrorOnPress,
    historyOnPress,
    romanceOnPress,
    romanticComedyOnPress,
    sportsOnPress,
    suspenseOnPress,
    thrillerOnPress,
    isForKids = false
}) => 
{
    const defaultCategories = 
    [
        { 
            title: CATEGORY_NAMES.HOME,
            onPress: homeOnPress
        },
        { 
            title: CATEGORY_NAMES.MY_LIST,
            onPress: myListOnPress
        },
        { 
            title: CATEGORY_NAMES.ADVENTURE,
            onPress: adventureOnPress 
        },
        { 
            title: CATEGORY_NAMES.ACTION,
            onPress: actionOnPress 
        },
        { 
            title: CATEGORY_NAMES.ANIME,
            onPress: animeOnPress 
        },
        { 
            title: CATEGORY_NAMES.ANIMATION,
            onPress: animationOnPress
        },
        { 
            title: CATEGORY_NAMES.CHILDREN_AND_FAMILY,
            onPress: childrenAndFamilyOnPress 
        },
        { 
            title: CATEGORY_NAMES.COMEDY,
            onPress: comedyOnPress 
        },
        { 
            title: CATEGORY_NAMES.DOCUMENTARY,
            onPress: documentaryOnPress 
        },
        { 
            title: CATEGORY_NAMES.FANTASY,
            onPress: fantasyOnPress 
        },
        {
            title: CATEGORY_NAMES.HISTORY,
            onPress: historyOnPress
        },
        { 
            title: CATEGORY_NAMES.HORROR,
            onPress: horrorOnPress 
        },
        {
            title: CATEGORY_NAMES.ROMANCE,
            onPress: romanceOnPress
        },
        {
            title: CATEGORY_NAMES.ROMANTICE_COMEDY,
            onPress: romanticComedyOnPress
        },
        {
            title: CATEGORY_NAMES.SPORTS,
            onPress: sportsOnPress
        },
    ];

    if (isForKids) {
        return defaultCategories;
    }

    return [
        ...defaultCategories,
        { 
            title: CATEGORY_NAMES.CRIME,
            onPress: crimeOnPress 
        },
        { 
            title: CATEGORY_NAMES.DRAMA,
            onPress: dramaOnPress 
        },
        {
            title: CATEGORY_NAMES.SUSPENSE,
            onPress: suspenseOnPress
        },
        {
            title: CATEGORY_NAMES.THRILLER,
            onPress: thrillerOnPress
        }
    ];
}