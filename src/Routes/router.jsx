import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import SignIn from '../Pages/SignIn/SignIn';
import SignUp from '../Pages/SignUp/SignUp';
import Cart from '../Pages/Cart/Cart';
import PrivateRoute from '../PrivateRoutes/PrivateRoute';
import About from '../Pages/About/About';
import Contact from '../Pages/Contact/Contact';

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
            loader: ()=> fetch(`http://localhost:5000/products`)
        },
        {          
            path: '/signIn',
            element: <SignIn></SignIn>
        },
        {          
            path: '/signUp',
            element: <SignUp></SignUp>
        },
        {
          path: '/myCart',
          element: <PrivateRoute><Cart></Cart></PrivateRoute>
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/contact',
          element: <Contact></Contact>
        }
      ]
    },
  ]);

export default router;