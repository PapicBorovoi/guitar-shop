import { RouteObject } from 'react-router-dom';
import { AppRoutes } from '../../types/app-routes.enum';
import Layout from '../layout/layout';
import CatalogPage from '../../pages/catalog/catalog-page';

export const routeConfig: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: AppRoutes.Catalog,
        element: <CatalogPage />,
      },
      {
        path: AppRoutes.Card,
        children: [
          {
            path: ':id',
            element: <div>Card</div>,
          },
          {
            index: true,
            element: <div>404</div>,
          },
        ],
      },
      {
        path: AppRoutes.Create,
        element: <div>Create</div>,
      },
      {
        path: AppRoutes.Redact,
        element: <div>Redact</div>,
      },
      {
        path: AppRoutes.Login,
        element: <div>Login</div>,
      },
      {
        path: AppRoutes.Register,
        element: <div>Register</div>,
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
];
