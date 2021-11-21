import Echo from '../utils/echo'

const EVENT_NAME = 'SubscriptionCancelledEvent';

export const listen = async (userId, callback) =>
{
    return await Echo()
        .then(res => {
            return res
                    .private(`subscription.cancelled.${ userId }`)
                    .listen(EVENT_NAME, callback)
                    .error(err => {
                        console.log(err)
                    });
        })
}

export const unListen = async (userId) => (await Echo()).leave(`subscription.cancelled.${ userId }`);