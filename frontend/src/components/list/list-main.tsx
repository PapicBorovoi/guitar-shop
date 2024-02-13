import { FC, useEffect } from 'react';
import { AppRoutes } from '../../types/app-routes.enum';
import { Link, useNavigate } from 'react-router-dom';
import ListFilter from './list-filter';
import ListSort from './list-sort';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import {
  getItems,
  getLimit,
  getPage,
  getQuery,
  getTotal,
} from '../../store/slices/items.selectors';
import ListItem from './list-item';
import { getItemsAction } from '../../store/api-actions/items-action';
import { range } from '../../util/common';
import { MAX_SHOWN_PAGES_PAGINATION } from '../../app.const';

const ListMain: FC = () => {
  const total = useAppSelector(getTotal);
  const limit = useAppSelector(getLimit);
  const items = useAppSelector(getItems);
  const query = useAppSelector(getQuery);
  const page = useAppSelector(getPage);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const totalPages = Math.ceil(total / limit);

  let startPage: number;
  switch (page % MAX_SHOWN_PAGES_PAGINATION) {
    case 0:
      startPage = page;
      break;
    case 1:
      startPage = page - 1;
      break;
    default:
      startPage = page - 2;
      break;
  }
  const pages =
    totalPages - startPage < MAX_SHOWN_PAGES_PAGINATION
      ? totalPages - startPage
      : MAX_SHOWN_PAGES_PAGINATION;
  const rangeArray = range(pages, startPage);

  useEffect(() => {
    dispatch(getItemsAction(query));
  }, [query, dispatch, total]);

  return (
    <main className='page-content'>
      <section className='product-list'>
        <div className='container'>
          <h1 className='product-list__title'>Список товаров</h1>
          <ul className='breadcrumbs'>
            <li className='breadcrumbs__item'>
              <Link className='link' to={AppRoutes.Login}>
                Вход
              </Link>
            </li>
            <li className='breadcrumbs__item'>
              <a className='link'>Товары</a>
            </li>
          </ul>
          <div className='catalog'>
            <ListFilter />
            <ListSort />
            <div className='catalog-cards'>
              <ul className='catalog-cards__list'>
                {items.map((item) => (
                  <ListItem item={item} key={item.vendorCode} />
                ))}
              </ul>
            </div>
          </div>
          <button
            className='button product-list__button button--red button--big'
            onClick={() => {
              nav(AppRoutes.Create);
            }}
          >
            Добавить новый товар
          </button>
          <div className='pagination product-list__pagination'>
            <ul className='pagination__list'>
              {rangeArray.map((value) => (
                <li
                  className={`pagination__page ${
                    page === value ? 'pagination__page--active' : ''
                  }`}
                  key={value + 1}
                >
                  <a
                    className='link pagination__page-link'
                    onClick={() => {
                      dispatch(getItemsAction({ ...query, page: value }));
                    }}
                  >
                    {value + 1}
                  </a>
                </li>
              ))}
              {startPage + MAX_SHOWN_PAGES_PAGINATION >= totalPages ? null : (
                <li
                  className='pagination__page pagination__page--next'
                  id='next'
                >
                  <a
                    className='link pagination__page-link'
                    onClick={() => {
                      dispatch(
                        getItemsAction({
                          ...query,
                          page: startPage + MAX_SHOWN_PAGES_PAGINATION,
                        })
                      );
                    }}
                  >
                    Далее
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ListMain;
