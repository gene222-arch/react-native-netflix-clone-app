import Echo from './../utils/echo'

const EVENT_NAME = 'ComingSoonMovieReleasedEvent';
const CHANNEL = 'coming.soon.movie.released';

export const listen = async (callback) =>
{
    return await Echo().then(res => {
        return res
                .private('coming.soon.movie.released')
                .listen(EVENT_NAME, callback)
                .error(err => {
                    console.log(err)
                });
        })
}

export const unListen = async () => (await Echo()).leave(CHANNEL);
