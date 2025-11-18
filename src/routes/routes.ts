import Authentification from '../pages/Authentification';
import Commutnity from '../pages/Community';
import CreateCommunity from '../pages/CreateCommunity';
import CreatePost from '../pages/CreatePost';
import Main from '../pages/Main';
import Profile from '../pages/Profile';
import { AUTH, COMMUNITY_ROUTE, CREATE_COMMUNITY_ROUTE, CREATE_POST, CREATE_POST_WITH_COMMUNITY, HOME_ROUTE, POPULAR_ROUTE, USER_ROUTE } from '../utils/consts';

export const routes_auth = [
    {
        path:CREATE_COMMUNITY_ROUTE,
        Component: CreateCommunity
    },
    {
        path:CREATE_POST,
        Component: CreatePost
    },
    {
        path:CREATE_POST_WITH_COMMUNITY,
        Component: CreatePost
    }
]
export const routes_anon = [
    {
        path:HOME_ROUTE,
        Component: Main
    },
    {
        path:POPULAR_ROUTE,
        Component: Main
    },
    {
        path:USER_ROUTE,
        Component: Profile
    },
    {
        path:COMMUNITY_ROUTE,
        Component:Commutnity
    },
    {
        path:AUTH,
        Component:Authentification
    }
]