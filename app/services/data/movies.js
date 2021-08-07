const shows = [{
    id: 'movie1',
    title: 'Suits',
    year: 2019,
    total_number_of_seasons: 9,
    total_number_of_episodes: 6,
    poster_path: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep0.jpg',
    plot: 'When he impresses a big lawyer with his razor-sharp mind, a college droput scores a coveted associate job, even though he has no legal credentials.',
    cast: 'Gabriel Macht, Patrick J. Adams, Rick Hoggman',
    creator: 'Aaron Korsh',
    trailer_video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    
    seasons: [
        {
            id: 'season1',
            name: 'Season 1',
            episodes: [
                {
                    id: 'episode1',
                    show_id: 'movie1',
                    season_id: 1,
                    title: '1. Pilot Part 1 & 2',
                    poster_path: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep0.jpg',
                    duration: '1h 21m',
                    size: '24 mb',
                    plot: 'When Harvey\'s promotion requires him to recruit and hire a graduate of Harvard Law, he chooses Mike Ross. But Mike doesn\'t actualy have a law degree',
                    video_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    isRated: false,
                    rate: '',
                    total_number_of_episodes: 1,
                    total_number_of_seasons: 1,
                }, {
                    id: 'episode2',
                    show_id: 'movie1',
                    season_id: 1,
                    title: '2. Errors and Omissions',
                    poster_path: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep1.jpg',
                    duration: '43m',
                    size: '24 mb',
                    plot: 'An open-and-shut case becomes anything but when Harvey is accused of an inappropriate dalliance with a married woman.',
                    video_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    isRated: false,
                    rate: '',
                    total_number_of_episodes: 1,
                    total_number_of_seasons: 1,
                }
            ]
        }, 
        {
            id: 'season2',
            name: 'Season 2',
            episodes: [
                {
                    id: 'episode3',
                    show_id: 'movie1',
                    season_id: 2,
                    title: '1. New season',
                    poster_path: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep3.jpg',
                    duration: '41m',
                    size: '24 mb',
                    plot: 'When Harvey\'s promotion requires him to recruit and hire a graduate of Harvard Law, he chooses Mike Ross. But Mike doesn\'t actualy have a law degree',
                    video_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    isRated: false,
                    rate: '',
                    total_number_of_episodes: 1,
                    total_number_of_seasons: 1,
                }, {
                    id: 'episode4',
                    show_id: 'movie1',
                    season_id: 2,
                    title: '2. Are you subscribed?',
                    poster_path: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep0.jpg',
                    duration: '49m',
                    size: '24 mb',
                    plot: 'An open-and-shut case becomes anything but when Harvey is accused of an inappropriate dalliance with a married woman.',
                    video_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    isRated: false,
                    rate: '',
                    total_number_of_episodes: 1,
                    total_number_of_seasons: 1,
                }
            ]
        }, 
        {
            id: 'season3',
            name: 'Season 3',
            episodes: [
                {
                    id: 'episode3',
                    show_id: 'movie1',
                    season_id: 3,
                    title: '1. New season',
                    poster_path: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep3.jpg',
                    duration: '41m',
                    size: '24 mb',
                    plot: 'When Harvey\'s promotion requires him to recruit and hire a graduate of Harvard Law, he chooses Mike Ross. But Mike doesn\'t actualy have a law degree',
                    video_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    isRated: false,
                    rate: '',
                    // DO REMOVE THIS, THIS IS JUST FOR TESTING PURPOSES
                    total_number_of_episodes: 1,
                    total_number_of_seasons: 1,
                }, {
                    id: 'episode4',
                    show_id: 'movie1',
                    season_id: 3,
                    title: '2. Are you subscribed?',
                    poster_path: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep0.jpg',
                    duration: '49m',
                    size: '24 mb',
                    plot: 'An open-and-shut case becomes anything but when Harvey is accused of an inappropriate dalliance with a married woman.',
                    video_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    isRated: false,
                    rate: '',
                    total_number_of_episodes: 1,
                    total_number_of_seasons: 1,
                }
            ]
        }
    ]
}];

export default shows