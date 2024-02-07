import { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => (
  <HelmetProvider>
    <Outlet />
  </HelmetProvider>
);

export default Layout;
