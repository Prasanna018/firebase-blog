import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignIn from "./pages/signin";
import CreatePost from "./pages/create-post";

import Blogs from "./pages/blogs/Blogs";
import SinglePost from "./pages/Single-Post";


export const router = createBrowserRouter([
    {
        element: <Home></Home>,
        path: '/'

    },
    {
        element: <Login></Login>,
        path: '/login'
    }, {
        element: <SignIn></SignIn>,
        path: '/signin'
    }, {
        element: <CreatePost></CreatePost>,
        path: '/create'
    },
    {
        element: <Blogs></Blogs>,
        path: '/blogs',

    },
    {
        element: <SinglePost></SinglePost>,
        path: '/blog/:id'
    }
])