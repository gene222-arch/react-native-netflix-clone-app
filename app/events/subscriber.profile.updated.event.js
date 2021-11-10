import Echo from '../utils/echo'

const EVENT_NAME = 'SubscriberProfileUpdatedEvent';

export const listen = async (userId, callback) =>
{
    return await Echo().then(res => {
        return res
                .private(`subscribed.profile.updated.${ userId }`)
                .listen(EVENT_NAME, callback)
                .error(err => {
                    console.log(err)
                });
        })
}

export const unListen = async (userId) => (await Echo()).leave(`subscribed.profile.updated.${ userId }`);