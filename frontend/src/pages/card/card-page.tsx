import { FC } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import CardMain from '../../components/card/card-main';
import { useAppSelector } from '../../hooks/use-store';
import { Navigate } from 'react-router-dom';
import { getItem } from '../../store/slices/items.selectors';
import { AppRoutes } from '../../types/app-routes.enum';

const CardPage: FC = () => {
  const item = useAppSelector(getItem);

  if (!item) {
    return <Navigate to={AppRoutes.List} />;
  }

  return (
    <div className='wrapper'>
      <Header />
      <CardMain item={item} />
      <Footer />
    </div>
  );
};

export default CardPage;
