import {Navigate, createBrowserRouter} from "react-router-dom";
import Login from "./views/Login";
import Notfound from "./views/Notfound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import { Children } from "react";
import Dashboard from "./views/Dashboard";
import Signup from "./views/Signup";
import Users from "./views/Users";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users  />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            }, 
            {
                path: '/signup',
                element: <Signup />
            }, 
        ]
    },
    {
        path: '*',
        element: <Notfound />
    }
])

export default router;