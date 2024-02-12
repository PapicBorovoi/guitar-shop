import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { getQuery } from '../../store/slices/items.selectors';
import { SortDirection, SortType } from '../../types/query.type';
import { itemsSlice } from '../../store/slices/items.slice';
import { getItemsAction } from '../../store/api-actions/items-action';

const ListSort: FC = () => {
  const query = useAppSelector(getQuery);
  const dispatch = useAppDispatch();

  return (
    <div className='catalog-sort'>
      <h2 className='catalog-sort__title'>Сортировать:</h2>
      <div className='catalog-sort__type'>
        <button
          className={`catalog-sort__type-button ${
            query.sortType === SortType.CreatedAt
              ? 'catalog-sort__type-button--active'
              : ''
          }`}
          aria-label='по цене'
          onClick={() => {
            dispatch(
              getItemsAction({
                ...query,
                page: 0,
                sortType: SortType.CreatedAt,
              })
            );
            dispatch(itemsSlice.actions.setSortType(SortType.CreatedAt));
          }}
        >
          по дате
        </button>
        <button
          className={`catalog-sort__type-button ${
            query.sortType === SortType.Price
              ? 'catalog-sort__type-button--active'
              : ''
          }`}
          aria-label='по цене'
          onClick={() => {
            dispatch(
              getItemsAction({
                ...query,
                page: 0,
                sortType: SortType.Price,
              })
            );
            dispatch(itemsSlice.actions.setSortType(SortType.Price));
          }}
        >
          по цене
        </button>
      </div>
      <div className='catalog-sort__order'>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${
            query.sortDirection === SortDirection.Asc
              ? 'catalog-sort__order-button--active'
              : ''
          }`}
          onClick={() => {
            dispatch(
              getItemsAction({
                ...query,
                page: 0,
                sortDirection: SortDirection.Asc,
              })
            );
            dispatch(itemsSlice.actions.setSortDirection(SortDirection.Asc));
          }}
          aria-label='По возрастанию'
        ></button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${
            query.sortDirection === SortDirection.Desc
              ? 'catalog-sort__order-button--active'
              : ''
          }`}
          onClick={() => {
            dispatch(
              getItemsAction({
                ...query,
                page: 0,
                sortDirection: SortDirection.Desc,
              })
            );
            dispatch(itemsSlice.actions.setSortDirection(SortDirection.Desc));
          }}
          aria-label='По убыванию'
        ></button>
      </div>
    </div>
  );
};

export default ListSort;
