import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Error from './Components/Error';
import Layout from './Components/Layout/Layout';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/Signup';
import Board from './Components/Board/Board';
import WritePost from './Components/Board/WritePost';
import DeletePage from './Components/Board/DeletePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/board',
                element: <Board />,
            },
            {
                path: '/board/write',
                element: <WritePost />,
            },
            {
                path: '/board/deletepage',
                element: <DeletePage />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
