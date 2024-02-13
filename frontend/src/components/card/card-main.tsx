import { FC, useState } from 'react';
import { Item } from '../../types/item.type';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../types/app-routes.enum';
import classNames from 'classnames';

const CardMain: FC<{ item: Item }> = ({ item }) => {
  const [activeTab, setActiveTab] = useState('characteristics');

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='page-content__title title title--bigger'>Товар</h1>
        <ul className='breadcrumbs page-content__breadcrumbs'>
          <li className='breadcrumbs__item'>
            <Link className='link' to={AppRoutes.Login}>
              Главная
            </Link>
          </li>
          <li className='breadcrumbs__item'>
            <Link className='link' to={AppRoutes.List}>
              Каталог
            </Link>
          </li>
          <li className='breadcrumbs__item'>
            <a className='link'>Товар</a>
          </li>
        </ul>
        <div className='product-container'>
          <img
            className='product-container__img'
            src={
              item.imageUrl !== ''
                ? item.imageUrl
                : 'img/content/catalog-product-1.png'
            }
            srcSet={
              item.imageUrl !== ''
                ? item.imageUrl
                : 'img/content/catalog-product-1@2x.png 2x'
            }
            width='90'
            height='235'
            alt=''
          />
          <div className='product-container__info-wrapper'>
            <h2 className='product-container__title title title--big title--uppercase'>
              {item.name}
            </h2>
            <br />
            <br />
            <div className='tabs'>
              <a
                className={classNames(
                  'button',
                  'button--medium',
                  'tabs__button',
                  { 'button--black-border': activeTab !== 'characteristics' }
                )}
                href='#characteristics'
                onClick={() => setActiveTab('characteristics')}
              >
                Характеристики
              </a>
              <a
                className={classNames(
                  'button',
                  { 'button--black-border': activeTab !== 'description' },
                  'button--medium',
                  'tabs__button'
                )}
                href='#description'
                onClick={() => setActiveTab('description')}
              >
                Описание
              </a>
              <div className='tabs__content' id='characteristics'>
                <table
                  className={`tabs__table ${
                    activeTab === 'characteristics' ? '' : 'hidden'
                  }`}
                >
                  <tr className='tabs__table-row'>
                    <td className='tabs__title'>Артикул:</td>
                    <td className='tabs__value'>{item.vendorCode}</td>
                  </tr>
                  <tr className='tabs__table-row'>
                    <td className='tabs__title'>Тип:</td>
                    <td className='tabs__value'>{item.type}</td>
                  </tr>
                  <tr className='tabs__table-row'>
                    <td className='tabs__title'>Количество струн:</td>
                    <td className='tabs__value'>
                      {item.numberOfStrings} струнная
                    </td>
                  </tr>
                </table>
                <p
                  className={`tabs__product-description ${
                    activeTab === 'description' ? '' : 'hidden'
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CardMain;
