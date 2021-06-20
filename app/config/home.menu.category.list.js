import Colors from './../constants/Colors';

export default ({ homeOnPress, myListOnPress, categoryOnPress }) => 
{
    return [
        { 
            title: 'Home',
            customStyle: {
                fontWeight: 'bold',
                fontSize: 24,
                color: Colors.white,
                marginTop: 80,
            },
            onPress: homeOnPress
        },
        { 
            title: 'My List',
            onPress: myListOnPress
        },
        { 
            title: 'Available for Download',
            onPress: categoryOnPress 
        },
        { 
            title: 'Action',
            onPress: categoryOnPress 
        },
        { 
            title: 'Anime',
            onPress: categoryOnPress 
        },
        { 
            title: 'Children and Family',
            onPress: categoryOnPress 
        },
        { 
            title: 'Comedies',
            onPress: categoryOnPress 
        },
        { 
            title: 'Critically Acclaimed',
            onPress: categoryOnPress 
        },
        { 
            title: 'Documentaries',
            onPress: categoryOnPress 
        },
        { 
            title: 'Dramas',
            onPress: categoryOnPress 
        },
        { 
            title: 'Fantasy',
            onPress: categoryOnPress 
        },
        { 
            title: 'Horror',
            onPress: categoryOnPress 
        },
        { 
            title: 'Trending',
            onPress: categoryOnPress 
        },
        { 
            title: 'Kids',
            onPress: categoryOnPress 
        },
        { 
            title: 'Science Fiction',
            onPress: categoryOnPress 
        },
        { 
            title: 'Detective',
            onPress: categoryOnPress 
        }
    ];
}