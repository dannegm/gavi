import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Subjects = lazy(() => import('./pages/Subjects'));
const Resources = lazy(() => import('./pages/Resources'));
const Downloadables = lazy(() => import('./pages/Downloadables'));

const exact = true;

const routes = [
    {
        name: 'gavi.home',
        path: '/',
        component: Home,
        exact,
    },
    {
        name: 'gavi.subjects',
        path: '/materias',
        component: Subjects,
        exact,
    },
    {
        name: 'gavi.resources',
        path: '/material',
        component: Resources,
        exact,
    },
    {
        name: 'gavi.downloadables',
        path: '/descargables',
        component: Downloadables,
        exact,
    },
];

export default routes;
