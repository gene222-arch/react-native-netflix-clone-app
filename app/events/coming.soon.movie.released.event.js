import Echo from './../utils/echo'

const listen = (callback) =>
{
    return Echo()
        .private('coming.soon.movie.released')
        .listen('ComingSoonMovieReleasedEvent', callback)
        .error(err => {
            console.log(err)
        });
}

const unListen = () => Echo().private('coming.soon.movie.released').stopListening();

export { listen, unListen }