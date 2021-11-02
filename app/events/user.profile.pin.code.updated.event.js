import Echo from '../utils/echo'

const eventName = 'UserProfilePINCodeUpdatedEvent';

export const listen = async (userId, callback) =>
{
    return await Echo().then(res => {
        return res
                .private(`user.profile.manage.pincode.${ userId }`)
                .listen(eventName, callback)
                .error(err => console.log(err));
        })
}

export const unListen = async (userId) => (await Echo()).leave(`user.profile.manage.pincode.${ userId }`);