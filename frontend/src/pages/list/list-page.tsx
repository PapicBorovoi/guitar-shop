import { FC, useEffect } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import ListMain from '../../components/list/list-main';
import { useAppDispatch } from '../../hooks/use-store';
import { itemsSlice } from '../../store/slices/items.slice';

const ListPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(itemsSlice.actions.setItemToNull());
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <ListMain />
      <Footer />
    </div>
  );
};

export default ListPage;
