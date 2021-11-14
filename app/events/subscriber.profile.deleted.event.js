import Echo from '../utils/echo'

const EVENT_NAME = 'SubscriberProfileDeletedEvent';

export const listen = async (userId, callback) =>
{
    return await Echo().then(res => {
        return res
                .private(`subscriber.profile.deleted.${ userId }`)
                .listen(EVENT_NAME, callback)
                .error(err => {
                    console.log(err)
                });
        })
}

export const unListen = async (userId) => (await Echo()).leave(`subscriber.profile.deleted.${ userId }`);