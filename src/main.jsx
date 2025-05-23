import React from 'react'
import ReactDOM from 'react-dom/client'
import {  HelmetProvider } from 'react-helmet-async';
import { router } from './Routes/Routes';
import { RouterProvider } from 'react-router-dom';
import './index.css'



import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './provider/AuthProvider';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HelmetProvider>
          
              <RouterProvider router={router}></RouterProvider>
           
          </HelmetProvider>
          </AuthProvider>
        </QueryClientProvider>
      
  </React.StrictMode>,
)