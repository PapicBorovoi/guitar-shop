import { RouteObject } from 'react-router-dom';
import { AppRoutes } from '../../types/app-routes.enum';
import Layout from '../layout/layout';
import ListPage from '../../pages/list/list-page';
import LoginPage from '../../pages/login/login-page';
import CardPage from '../../pages/card/card-page';
import CreatePage from '../../pages/create/create-page';
import RedactPage from '../../pages/redact/redact-page';
import RegisterPage from '../../pages/register/register-page';
import NotFoundPage from '../../pages/not-found/not-found-page';
import PrivateRoute from '../misc/private-route';

export const routeConfig: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: AppRoutes.Login,
        element: (
          <PrivateRoute>
            <LoginPage />
          </PrivateRoute>
        ),
      },
      {
        path: AppRoutes.List,
        element: (
          <PrivateRoute isAuthNeeded>
            <ListPage />
          </PrivateRoute>
        ),
      },
      {
        path: AppRoutes.Card,
        element: (
          <PrivateRoute isAuthNeeded>
            <CardPage />
          </PrivateRoute>
        ),
      },
      {
        path: AppRoutes.Create,
        element: (
          <PrivateRoute isAuthNeeded>
            <CreatePage />
          </PrivateRoute>
        ),
      },
      {
        path: AppRoutes.Redact,
        element: (
          <PrivateRoute isAuthNeeded>
            <RedactPage />
          </PrivateRoute>
        ),
      },
      {
        path: AppRoutes.Register,
        element: (
          <PrivateRoute>
            <RegisterPage />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: (
          <PrivateRoute>
            <NotFoundPage />
          </PrivateRoute>
        ),
      },
    ],
  },
];
