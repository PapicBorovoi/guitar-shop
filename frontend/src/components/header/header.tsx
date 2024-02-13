import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../types/app-routes.enum';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/slices/user.selectors';

const Header: FC = () => {
  const user = useSelector(getUser);

  return (
    <header className='header--admin header' id='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <Link className='header__logo logo' to={AppRoutes.List}>
            <img
              className='logo__img'
              width='70'
              height='70'
              src='./img/svg/logo.svg'
              alt='Логотип'
            />
          </Link>
          <nav className='main-nav'>
            <ul className='main-nav__list'>
              <li className='main-nav__item'>
                <a className='link main-nav__link' href='main'>
                  Каталог
                </a>
              </li>
              <li className='main-nav__item'>
                <Link className='link main-nav__link' to={AppRoutes.List}>
                  Список товаров
                </Link>
              </li>
            </ul>
          </nav>
          <div className='header__container'>
            <span className='header__user-name'>{user?.name}</span>
            <Link
              className='header__link'
              to={AppRoutes.Login}
              aria-label='Перейти в личный кабинет'
            >
              <svg
                className='header__link-icon'
                width='12'
                height='14'
                aria-hidden='true'
              >
                <use xlinkHref='#icon-account'></use>
              </svg>
              <span className='header__link-text'>Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
