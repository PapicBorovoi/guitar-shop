import { FC } from 'react';
import LoginHeader from '../../components/header/login-header';
import Footer from '../../components/footer/footer';
import LoginMain from '../../components/login/login-main';

const LoginPage: FC = () => (
  <div className='wrapper'>
    <LoginHeader />
    <LoginMain />
    <Footer />
  </div>
);

export default LoginPage;
