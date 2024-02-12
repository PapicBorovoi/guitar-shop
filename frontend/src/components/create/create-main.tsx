import { FC } from 'react';
import CreateForm from './create-form';
import { AppRoutes } from '../../types/app-routes.enum';
import { Link } from 'react-router-dom';

const CreateMain: FC = () => (
  <main className='page-content'>
    <section className='add-item'>
      <div className='container'>
        <h1 className='add-item__title'>Новый товар</h1>
        <ul className='breadcrumbs'>
          <li className='breadcrumbs__item'>
            <Link className='link' to={AppRoutes.Login}>
              Вход
            </Link>
          </li>
          <li className='breadcrumbs__item'>
            <Link className='link' to={AppRoutes.List}>
              Товары
            </Link>
          </li>
          <li className='breadcrumbs__item'>
            <a className='link'>Новый товар</a>
          </li>
        </ul>
        <CreateForm />
      </div>
    </section>
  </main>
);

export default CreateMain;
