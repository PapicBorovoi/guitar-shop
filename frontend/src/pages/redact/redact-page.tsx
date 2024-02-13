import { FC } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import CreateMain from '../../components/create/create-main';
import { useAppSelector } from '../../hooks/use-store';
import { getItem } from '../../store/slices/items.selectors';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../types/app-routes.enum';

const RedactPage: FC = () => {
  const item = useAppSelector(getItem);

  if (!item) {
    return <Navigate to={AppRoutes.List} />;
  }

  return (
    <div className='wrapper'>
      <Header />
      <CreateMain />
      <Footer />
    </div>
  );
};

export default RedactPage;
