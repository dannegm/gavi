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
        path: '/material/:grade/:year/:month/:day/:subject',
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
