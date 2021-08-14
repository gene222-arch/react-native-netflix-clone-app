const searchList = [
    {
        id: 1,
        title: 'Attack On Titan',
        genres: 'Action, Science, Something',
        authors: 'Hajime Isayama',
        plot: 'The plot of Attack on Titan centers on a civilization inside three walls, the last location where humans still live. Over one hundred years ago, humanity was driven to the brink of extinction after the emergence of humanoid giants called Titans, who attack and eat humans on sight.',
        duration_in_minutes: '43',
        age_restriction: 29,
        year: 2021,
        wallpaper_path: 'https://i.pinimg.com/originals/55/39/54/553954c0f30a23848c5ba63ee45cdbd5.jpg',
        poster_path: 'https://m.media-amazon.com/images/M/MV5BMTY5ODk1NzUyMl5BMl5BanBnXkFtZTgwMjUyNzEyMTE@._V1_.jpg',
        video_trailer_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 2,
        title: 'My Hero Academia',
        genres: 'Action, Science, Something',
        authors: 'Kohei Horikoshi',
        plot: 'The series focuses on a middle school student Izuku Midoriya, who has no superpowers. Will he be able to become a hero and somehow to contribute to the peace and stability in the world, where the weak is the minority that needs to be defended.',
        wallpaper_path: 'https://posterspy.com/wp-content/uploads/2020/02/my-hero-acadamia-two-heroes-netflix-poster.jpg',
        duration_in_minutes: '43',
        age_restriction: 29,
        year: 2021,
        poster_path: 'https://poster_pathspy.com/wp-content/uploads/2020/02/my-hero-acadamia-two-heroes-netflix-poster_path.jpg',
        video_trailer_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 3,
        title: 'Naruto',
        genres: 'Action, Science, Something',
        authors: 'Masashi Kishimoto',
        plot: 'Naruto (Japanese: NARUTO ナルト ) is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
        wallpaper_path: 'https://i.pinimg.com/originals/be/e6/f5/bee6f5c0314a5e9711e0582dc659a292.jpg',
        duration_in_minutes: '43',
        age_restriction: 29,
        year: 2021,
        poster_path: 'https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
        video_trailer_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 4,
        title: 'Jujutsu Kaisen',
        genres: 'Action, Science, Something',
        authors: 'Gege Akutami',
        plot: 'The Jujutsu Kaisen chapters are collected and published by Shueisha, with sixteen tankōbon volumes released as of June 2021. The story follows high school student Yuji Itadori as he joins a secret organization of Jujutsu Sorcerers in order to kill a powerful Curse named Ryomen Sukuna, of whom Yuji becomes the host.',
        duration_in_minutes: '43',
        age_restriction: 29,
        year: 2021,
        wallpaper_path: 'https://wallpaperaccess.com/full/5252278.jpg',
        poster_path: 'https://m.media-amazon.com/images/M/MV5BNzQyYzU3Y2MtOWY2Yy00ZGM2LTg3ZTUtMDJkZTJiMmEzMjYxXkEyXkFqcGdeQXVyMTI2NTY3NDg5._V1_.jpg',
        video_trailer_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },        
    {
        id: 5,
        title: 'Love is War',
        genres: 'Action, Science, Something',
        authors: 'Aka Akasaka',
        plot: "Kaguya-sama: Love is War started out as a manga with a specific premise: two high school geniuses, Shirogane and Kaguya, can't admit they're in love, so each tries to win a confession of affection from the other. This results in increasingly ridiculous mind games in which they end up outsmarting themselves.",
        duration_in_minutes: '43',
        age_restriction: 29,
        year: 2021,
        wallpaper_path: 'https://wallpapercave.com/wp/wp4051792.jpg',
        poster_path: 'https://m.media-amazon.com/images/M/MV5BOTkzZjZiOWItZGM5Ny00N2IxLTg4ZTQtYTBiODhlNmRlM2IxXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg',
        video_trailer_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 6,
        title: 'Eyeshield 21',
        genres: 'Action, Science, Something',
        authors: 'Hajime Isayama',
        plot: "The series tells the story of Sena Kobayakawa, an introverted boy who joins an American football club as a secretary, but after being coerced by quarterback Yoichi Hiruma, becomes the team's running back, whilst wearing an eyeshield and the number 21, under the pseudonym of 'Eyeshield 21'.",
        duration_in_minutes: '43',
        age_restriction: 29,
        year: 2021,
        wallpaper_path: 'https://wallpaperaccess.com/full/2096531.jpg',
        poster_path: 'https://m.media-amazon.com/images/M/MV5BMTBhZmE0ZjAtOWQxMy00NzI1LWFiYzctN2MwM2E3YmM2ZWU1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY1200_CR106,0,630,1200_AL_.jpg',
        video_trailer_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },   
    {
        id: 7,
        title: '7 Deadly Sins',
        genres: 'Action, Science, Something',
        authors: 'Nakaba Suzuki',
        plot: "The Seven Deadly Sins (Japanese: 七つの大罪, Hepburn: Nanatsu no Taizai) is a Japanese fantasy manga series written and illustrated by Nakaba Suzuki. It was serialized in Kodansha's Weekly Shōnen Magazine from October 2012 to March 2020, with the chapters collected into forty-one tankōbon volumes. The manga features a setting similar to the European Middle Ages, with its titular group of knights representing the seven deadly sins. The manga has been licensed by Kodansha USA for English publication in North America, while the chapters are released digitally by Crunchyroll in over 170 countries as they are published in Japan.",
        wallpaper_path: 'https://wallpaper.dog/large/16992856.jpg',
        duration_in_minutes: '43',
        age_restriction: 29,
        year: 2021,
        poster_path: 'https://m.media-amazon.com/images/M/MV5BMTQ0OTY3NjAxMF5BMl5BanBnXkFtZTgwMzE4NDAzNzE@._V1_.jpg',
        video_trailer_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },   
    {
        id: 8,
        title: 'Haikyuu',
        genres: 'Action, Science, Something',
        authors: 'Haruichi Furudate',
        plot: "Hinata Shouyou, a short middle school student, gained a sudden love of volleyball after watching a national championship match on TV. Determined to become like the championship's star player, a short boy nicknamed 'the small giant', Shouyou joined his school's volleyball club.",
        wallpaper_path: 'https://wallpapercave.com/wp/wp1818242.png',
        duration_in_minutes: '43',
        age_restriction: 29,
        year: 2021,
        
        
        poster_path: 'https://i.pinimg.com/originals/8d/13/99/8d1399e34546624009f4b1ffe67f55e1.png',
        video_trailer_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },   
    {
        id: 9,
        title: 'Promise Neverland',
        genres: 'Action, Science, Something',
        authors: 'Kaiu Shirai',
        plot: "When three gifted kids at an isolated idyllic orphanage discover the secret and sinister purpose they were raised for, they look for a way to escape from their evil caretaker and lead the other children in a risky escape plan. At Grace Field House, life couldn't be better for the orphans.",
        wallpaper_path: 'https://wallpapercave.com/wp/wp3951103.jpg',
        duration_in_minutes: '43',
        age_restriction: 29,
        year: 2021,
        poster_path: 'https://m.media-amazon.com/images/M/MV5BMTYwYjYyZDgtMTQ3My00YTI4LThmZTUtZmU1MjllOWRlOTdhXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_UY1200_CR85,0,630,1200_AL_.jpg',
        video_trailer_path: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    }
];

export default searchList