import Pusher from './../utils/echo'

export default () =>
{
    let response = null;
    
    Pusher()
        .private(`movie.created`)
        .listen('MovieCreatedEvent', res => {
            response = res;
        });

    return response;
}
