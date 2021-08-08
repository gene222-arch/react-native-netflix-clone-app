import Echo from './../utils/echo'

export const listen = async (callback) =>
{
    return await Echo().then(res => {
        res
            .private('movie.created')
            .listen('MovieCreatedEvent', callback)
            .error(err => {
                console.log(err)
            });
    })
}

export const unListen = async () => {
    return await Echo()    
        .then(res => {
            res
                .private('movie.created')
                .stopListening('MovieCreatedEvent');
        })
}