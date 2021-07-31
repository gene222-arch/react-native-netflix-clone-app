import Pusher from './../utils/pusher'

export default function ()
{
    let response = null;

    Pusher()
        .private(`coming.soon.movie.created`)
        .listen('LowStockEvent', res => {
            response = res;
        });

    return response;
}