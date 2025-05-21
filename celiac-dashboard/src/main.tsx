import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'
// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-photo-view/dist/react-photo-view.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';
import { Provider } from 'react-redux';
import store from './store/index';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import { MantineProvider } from '@mantine/core';
import { PhotoProvider } from 'react-photo-view';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
        <MantineProvider>
            <Provider  store={store}>
            <PhotoProvider>
                <RouterProvider  router={router} />
                </PhotoProvider>
            </Provider>
            </MantineProvider>
        </Suspense>
    </React.StrictMode>
);

