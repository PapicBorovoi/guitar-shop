import { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import StartFetch from '../misc/start-fetch';
import ScrollToTop from '../misc/scroll-to-top';

export const Layout: FC = () => (
  <HelmetProvider>
    <StartFetch>
      <ScrollToTop>
        <Outlet />
      </ScrollToTop>
    </StartFetch>
  </HelmetProvider>
);

export default Layout;
