import Pusher from './../utils/pusher'

export default () =>
{
    let response = null;

    Pusher()
        .private(`coming.soon.movie.created`)
        .listen('ComingSoonMovieCreatedEvent', res => {
            response = res;
        });

    return response;
}