import config from '../config';
import { Login, Chat, Register } from '../pages';

const publicRoutes = [
    { path: config.routes.register, component: Register },
    { path: config.routes.login, component: Login },
    { path: config.routes.chat, component: Chat },
];

export default publicRoutes;
