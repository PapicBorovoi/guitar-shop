import { FC } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routeConfig } from './route-config';
import store from '../../store';

const App: FC = () => {
  const router = createBrowserRouter(routeConfig);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
