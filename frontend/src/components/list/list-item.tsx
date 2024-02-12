import { FC } from 'react';
import { Item } from '../../types/item.type';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../types/app-routes.enum';
import { useAppDispatch } from '../../hooks/use-store';
import {
  deleteItemAction,
  getItemAction,
} from '../../store/api-actions/items-action';
import dayjs from 'dayjs';

type ListItemProps = {
  item: Item;
};

const ListItem: FC<ListItemProps> = ({ item }) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <li className='catalog-item'>
      <div className='catalog-item__data'>
        <img
          src='img/content/catalog-product-1.png'
          srcSet='img/content/catalog-product-1@2x.png 2x'
          width='36'
          height='93'
          alt='Картинка гитары'
        />
        <div className='catalog-item__data-wrapper'>
          <a
            className='link'
            onClick={() => {
              dispatch(getItemAction(item.vendorCode)).finally(() =>
                nav(AppRoutes.Card)
              );
            }}
          >
            <p className='catalog-item__data-title'>{item.name}</p>
          </a>
          <br />
          <p className='catalog-item__data-date'>
            Дата добавления {dayjs(item.createdAt).format('DD.MM.YYYY')}
          </p>
          <p className='catalog-item__data-price'>{item.price} ₽</p>
        </div>
      </div>
      <div className='catalog-item__buttons'>
        <a
          className='button button--small button--black-border'
          aria-label='Редактировать товар'
          onClick={() => {
            dispatch(getItemAction(item.vendorCode)).finally(() => {
              nav(AppRoutes.Redact);
            });
          }}
        >
          Редактировать
        </a>
        <button
          className='button button--small button--black-border'
          type='submit'
          aria-label='Удалить товар'
          onClick={() => {
            dispatch(deleteItemAction(item.vendorCode));
          }}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default ListItem;
