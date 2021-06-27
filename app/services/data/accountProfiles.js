import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const accountProfiles = 
[
    {
        id: uuidv4(),
        name: 'SC #30',
        profile_photo: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
    },
    {
        id: uuidv4(),
        name: 'LBJ #23',
        profile_photo: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png'
    },
    {
        id: uuidv4(),
        name: 'KD #35',
        profile_photo: 'https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png'
    },
    {
        id: uuidv4(),
        name: 'Gene #22',
        profile_photo: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png'
    }
];

export default accountProfiles