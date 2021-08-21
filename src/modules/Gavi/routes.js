import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));

const exact = true;

const routes = [
    {
        name: 'gavi.home',
        path: '/',
        component: Home,
        exact,
    },
];

export default routes;
