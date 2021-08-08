import Echo from './../utils/echo'

export const listen = async (callback) =>
{
    return await Echo().then(res => {
        res
            .private('coming.soon.movie.created')
            .listen('ComingSoonMovieCreatedEvent', callback)
            .error(err => {
                console.log(err)
            });
    })
}

export const unListen = async () => {
    return await Echo()    
        .then(res => {
            res
                .private('coming.soon.movie.created')
                .stopListening('ComingSoonMovieCreatedEvent');
        })
}
