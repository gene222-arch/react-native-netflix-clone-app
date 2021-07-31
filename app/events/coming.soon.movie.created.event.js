import Echo from './../utils/echo'

const listen = (callback) =>
{
    return Echo()
        .private('coming.soon.movie.created')
        .listen('ComingSoonMovieCreatedEvent', callback)
        .error(err => {
            console.log(err)
        });
}

const unListen = () => Echo().private('coming.soon.movie.created').stopListening();

export { listen, unListen }