import Echo from './../utils/echo'

const EVENT_NAME = 'SubscriberProfileCreatedEvent';

export const listen = async (userId, callback) =>
{
    return await Echo().then(res => {
        return res
                .private(`subscriber.profile.created.${ userId }`)
                .listen(EVENT_NAME, callback)
                .error(err => {
                    console.log(err)
                });
        })
}

export const unListen = async (userId) => (await Echo()).leave(`subscriber.profile.created.${ userId }`);