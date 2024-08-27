import './index.css'
import {CustomerForm} from "./pages/form/customerForm.tsx";
import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {RootLayout} from "@/components/layouts/rootLayout.tsx";


const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <CustomerForm />}
            ,

        ]
    }
]);

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
