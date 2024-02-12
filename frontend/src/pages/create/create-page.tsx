import { FC } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import CreateMain from '../../components/create/create-main';

const CreatePage: FC = () => (
  <div className='wrapper'>
    <Header />
    <CreateMain />
    <Footer />
  </div>
);

export default CreatePage;
