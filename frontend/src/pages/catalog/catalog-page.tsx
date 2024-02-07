import { FC } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import CatalogMain from '../../components/catalog/catalog-main';

const CatalogPage: FC = () => {
  const title = 'Список товаров';
  console.log(title);

  return (
    <div className='wrapper'>
      <Header />
      <CatalogMain />
      <Footer />
    </div>
  );
};

export default CatalogPage;
