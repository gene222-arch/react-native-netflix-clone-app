import Pusher from './../utils/pusher'

export default function ()
{
    let response = null;

    Pusher()
        .private(`movie.created`)
        .listen('LowStockEvent', res => {
            response = res;
        });

    return response;
}
