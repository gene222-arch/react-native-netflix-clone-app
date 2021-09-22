import Echo from '../utils/echo'

const eventName = 'UserProfilePINCodeUpdatedEvent';
const channel = 'user.profile.manage.pincode';

export const listen = async (callback) =>
{
    return await Echo().then(res => {
        return res
                .private(channel)
                .listen(eventName, callback)
                .error(err => console.log(err));
        })
}

export const unListen = async () => (await Echo()).leave(channel);