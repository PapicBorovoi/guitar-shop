import { FC } from 'react';
import Footer from '../../components/footer/footer';
import LoginHeader from '../../components/header/login-header';
import RegisterMain from '../../components/register/register-main';

const RegisterPage: FC = () => (
  <div className='wrapper'>
    <LoginHeader />
    <RegisterMain />
    <Footer />
  </div>
);

export default RegisterPage;
