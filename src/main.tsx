import './index.css'
// import {UserForm} from "./pages/form/userForm.tsx";
import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {RootLayout} from "@/components/layouts/rootLayout.tsx";
import UserPreview from "@/pages/preview/userPreview.tsx";
import {Provider} from "react-redux";
import {store} from "../store.ts";
import {UserForm} from "@/pages/form/userForm.tsx";


const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {
                path: '/form/:id',
                element: <UserForm/>
            },
            {
                path: '/preview',
                element: <UserPreview/>
            }

        ]
    }
]);

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
);
