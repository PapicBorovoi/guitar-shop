import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { getItem } from '../../store/slices/items.selectors';
import { GuitarType, Item, StringsNumber } from '../../types/item.type';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../types/app-routes.enum';
import {
  createItemAction,
  updateItemAction,
} from '../../store/api-actions/items-action';
import dayjs from 'dayjs';
import RadioInput from './radio-input';

const CreateForm: FC = () => {
  const item = useAppSelector(getItem);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(
    item ||
      ({
        name: '',
        price: 100,
        vendorCode: '12345',
        description: '',
        imageUrl: '',
        createdAt: new Date(),
        type: GuitarType.Acoustic,
        numberOfStrings: StringsNumber.Four,
      } as Item)
  );

  const handleGuitarTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, type: e.target.value as GuitarType });
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, numberOfStrings: +e.target.value as StringsNumber });
  };

  return (
    <form className='add-item__form' action='#' method='get'>
      <div className='add-item__form-left'>
        <div className='edit-item-image add-item__form-image'>
          <div className='edit-item-image__image-wrap'></div>
          <div className='edit-item-image__btn-wrap'>
            <button className='button button--small button--black-border edit-item-image__btn'>
              {item ? 'Изменить' : 'Добавить'}
            </button>
            <button className='button button--small button--black-border edit-item-image__btn'>
              Удалить
            </button>
          </div>
        </div>
        <div className='input-radio add-item__form-radio'>
          <span>Выберите тип товара</span>
          {Object.values(GuitarType).map((type) => (
            <RadioInput
              key={type}
              value={type}
              name='type'
              handleChange={handleGuitarTypeChange}
              checked={form.type === type}
            />
          ))}
        </div>
        <div className='input-radio add-item__form-radio'>
          <span>Количество струн</span>
          {Object.values(StringsNumber)
            .filter((num) => typeof num === 'number')
            .map((number) => (
              <RadioInput
                key={number}
                name='strings'
                value={number.toString()}
                handleChange={handleStringChange}
                checked={form.numberOfStrings === number}
              />
            ))}
        </div>
      </div>
      <div className='add-item__form-right'>
        <div className='custom-input add-item__form-input'>
          <label>
            <span>Дата добавления товара</span>
            <input
              type='text'
              name='date'
              value={dayjs(form.createdAt).format('DD.MM.YYYY')}
              placeholder='Дата в формате 00.00.0000'
              readOnly
              onChange={(evt) => {
                setForm({ ...form, createdAt: new Date(evt.target.value) });
              }}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className='custom-input add-item__form-input'>
          <label>
            <span>Введите наименование товара</span>
            <input
              type='text'
              name='title'
              value={form.name}
              placeholder='Наименование'
              onChange={(evt) => {
                setForm({ ...form, name: evt.target.value });
              }}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className='custom-input add-item__form-input add-item__form-input--price is-placeholder'>
          <label>
            <span>Введите цену товара</span>
            <input
              type='text'
              name='price'
              value={form.price}
              placeholder='Цена в формате 00 000'
              onChange={(evt) => {
                setForm({ ...form, price: +evt.target.value });
              }}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className='custom-input add-item__form-input'>
          <label>
            <span>Введите артикул товара</span>
            <input
              type='text'
              name='sku'
              value={form.vendorCode}
              placeholder='Артикул товара'
              onChange={(evt) => {
                setForm({ ...form, vendorCode: evt.target.value });
              }}
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className='custom-textarea add-item__form-textarea'>
          <label>
            <span>Введите описание товара</span>
            <textarea
              name='description'
              placeholder='Описание товара'
              value={form.description}
              onChange={(evt) => {
                setForm({ ...form, description: evt.target.value });
              }}
            ></textarea>
          </label>
          <p>Заполните поле</p>
        </div>
      </div>
      <div className='add-item__form-buttons-wrap'>
        <button
          className='button button--small add-item__form-button'
          type='submit'
          onClick={(evt) => {
            evt.preventDefault();
            if (item) {
              dispatch(
                updateItemAction({ item: form, oldVendorCode: item.vendorCode })
              ).then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                  nav(AppRoutes.List);
                }
              });
            } else {
              dispatch(createItemAction(form)).then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                  nav(AppRoutes.List);
                }
              });
            }
          }}
        >
          Сохранить изменения
        </button>
        <button
          className='button button--small add-item__form-button'
          type='button'
          onClick={() => {
            nav(AppRoutes.List);
          }}
        >
          Вернуться к списку товаров
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
