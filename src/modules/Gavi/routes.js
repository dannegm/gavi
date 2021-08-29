import { lazy } from 'react';

const Root = lazy(() => import('./pages/Root'));
const Home = lazy(() => import('./pages/Home'));
const Subjects = lazy(() => import('./pages/Subjects'));
const Resources = lazy(() => import('./pages/Resources'));
const Downloadables = lazy(() => import('./pages/Downloadables'));
const Editor = lazy(() => import('./pages/Editor'));

const routes = [
    {
        name: 'gavi.editor',
        path: '/editor',
        component: Editor,
        exact: true,
    },
    {
        name: 'gavi.root',
        path: '/',
        component: Root,
        exact: true,
    },
    {
        name: 'gavi.home',
        path: '/aprende:grade',
        component: Home,
        exact: true,
    },
    {
        name: 'gavi.subjects',
        path: '/aprende:grade/materias/:year/:month/:day',
        component: Subjects,
        exact: true,
    },
    {
        name: 'gavi.resources',
        path: '/aprende:grade/material/:year/:month/:day/:subject',
        component: Resources,
        exact: true,
    },
    {
        name: 'gavi.downloadables',
        path: '/aprende:grade/descargables',
        component: Downloadables,
        exact: true,
    },
];

export default routes;
