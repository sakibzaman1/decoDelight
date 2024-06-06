import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/router.jsx'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import AuthProvider from './Providers/AuthProvider.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <QueryClientProvider client={queryClient}>
   <div className='max-w-[1440px] mx-auto'>
    <RouterProvider router={router}></RouterProvider>
    </div>
   </QueryClientProvider>
   </AuthProvider>
  </React.StrictMode>,
)
