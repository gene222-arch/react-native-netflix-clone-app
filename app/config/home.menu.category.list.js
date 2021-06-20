import Colors from './../constants/Colors';

export const CATEGORY_NAMES = 
{
    HOME: 'Home',
    MY_LIST: 'My List',
    AVAILABLE_FOR_DOWNLOAD: 'Available For Download',
    ACTION: 'Action',
    ANIME: 'Anime',
    CHILDREN_AND_FAMILY: 'Children and Family',
    COMEDIES: 'Comedies',
    CRITICALLY_ACCLAIMED: 'Critically Acclaimed',
    DOCUMENTARIES: 'Documentaries',
    DRAMAS: 'Dramas',
    FANTASY: 'Fantasy',
    HORROR: 'Horror'
};

export default ({ 
    homeOnPress, 
    myListOnPress, 
    availableForDownloadOnPress,
    animeOnPress,
    actionOnPress,
    childrenAndFamilyOnPress,
    comediesOnPress,
    criticallyAcclaimedOnPress,
    documentariesOnPress,
    dramaOnPress,
    fantasyOnPress,
    horrorOnPress
}) => 
{
    return [
        { 
            title: CATEGORY_NAMES.HOME,
            customStyle: {
                fontWeight: 'bold',
                fontSize: 24,
                color: Colors.white,
                marginTop: 80,
            },
            onPress: homeOnPress
        },
        { 
            title: CATEGORY_NAMES.MY_LIST,
            onPress: myListOnPress
        },
        { 
            title: CATEGORY_NAMES.AVAILABLE_FOR_DOWNLOAD,
            onPress: availableForDownloadOnPress 
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
            title: CATEGORY_NAMES.CHILDREN_AND_FAMILY,
            onPress: childrenAndFamilyOnPress 
        },
        { 
            title: CATEGORY_NAMES.COMEDIES,
            onPress: comediesOnPress 
        },
        { 
            title: CATEGORY_NAMES.CRITICALLY_ACCLAIMED,
            onPress: criticallyAcclaimedOnPress 
        },
        { 
            title: CATEGORY_NAMES.DOCUMENTARIES,
            onPress: documentariesOnPress 
        },
        { 
            title: CATEGORY_NAMES.DRAMAS,
            onPress: dramaOnPress 
        },
        { 
            title: CATEGORY_NAMES.FANTASY,
            onPress: fantasyOnPress 
        },
        { 
            title: CATEGORY_NAMES.HORROR,
            onPress: horrorOnPress 
        }
    ];
}