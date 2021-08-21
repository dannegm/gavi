import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Subjects = lazy(() => import('./pages/Subjects'));
const Resources = lazy(() => import('./pages/Resources'));
const Downloadables = lazy(() => import('./pages/Downloadables'));

const routes = [
    {
        name: 'gavi.home',
        path: '/:grade',
        component: Home,
        exact: true,
    },
    {
        name: 'gavi.subjects',
        path: '/materias/:grade/:year/:month/:day',
        component: Subjects,
        exact: true,
    },
    {
        name: 'gavi.resources',
        path: '/material/:grade',
        component: Resources,
        exact: true,
    },
    {
        name: 'gavi.downloadables',
        path: '/descargables/:grade',
        component: Downloadables,
        exact: true,
    },
];

export default routes;
