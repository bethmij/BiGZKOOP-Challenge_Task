import './index.css'
import {CustomerForm} from "./pages/form/customerForm.tsx";
import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <CustomerForm />
    }
]);

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
