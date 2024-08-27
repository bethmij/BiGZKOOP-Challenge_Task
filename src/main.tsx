import './index.css'
import {UserForm} from "./pages/form/userForm.tsx";
import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {RootLayout} from "@/components/layouts/rootLayout.tsx";
import UserPreview from "@/pages/preview/userPreview.tsx";


const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <UserPreview/>}
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
