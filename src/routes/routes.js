import config from '../config';
import { Login, Chat, Register, Profile } from '../pages';

const publicRoutes = [
    { path: config.routes.register, component: Register },
    { path: config.routes.login, component: Login },
    { path: config.routes.chat, component: Chat },
    { path: config.routes.profile, component: Profile },
];

export default publicRoutes;
