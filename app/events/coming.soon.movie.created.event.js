import Echo from './../utils/echo'

const EVENT_NAME = 'ComingSoonMovieCreatedEvent';
const CHANNEL = 'coming.soon.movie.created';

export const listen = async (callback) =>
{
    return await Echo()
        .then(res => {
            return res
                    .private(CHANNEL)
                    .listen(EVENT_NAME, callback)
                    .error(err => {
                        console.log(err)
                    });
        })
}

export const unListen = async () => (await Echo()).leave(CHANNEL);
