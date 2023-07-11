import React from 'react'
import App from './App'
import { createContext, useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/LadingPage/HomePage';
import { CasePage } from './pages/LadingPage/CasePage';
import { ComentsPage } from './pages/LadingPage/ComentsPage';
import { LoginPage } from './pages/LadingPage/LoginPage';

export const AuthContext = createContext();

export const Index = () => {
    const [dataUser, setDataUser] = useState({
        name: '',
        username: '',
        role: ''
    });

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect( () => {
        let token = localStorage.getItem('token')
        if(token) setLoggedIn(true)
    })

    useEffect(() => {
        let data = dataUser
        if (data) setDataUser(data)
    }, [])

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App></App>,
            errorElement: <NotFoundPage></NotFoundPage>,
            children: [
                {
                    path: '/',
                    element: <HomePage></HomePage>
                },
                {
                    path: '/case',
                    element: <CasePage></CasePage>
                },
                {
                    path: '/coments',
                    element: <ComentsPage></ComentsPage>
                },
                {
                    path: '/login',
                    element: <LoginPage></LoginPage>
                }
            ]
        }
    ])
  return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
  )
}