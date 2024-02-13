import { ChangeEvent, FC } from 'react';
import { GuitarType, StringsNumber } from '../../types/item.type';
import ListCheckBox from './list-checkbox';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { getQuery } from '../../store/slices/items.selectors';
import { itemsSlice } from '../../store/slices/items.slice';
import { getItemsAction } from '../../store/api-actions/items-action';

const ListFilter: FC = () => {
  const query = useAppSelector(getQuery);
  const dispatch = useAppDispatch();
  let filterGuitar = Object.assign([], query.filterGuitar);
  let filterString = Object.assign([], query.filterString);

  const onTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = evt.target;
    if (checked) {
      filterGuitar.push(name as GuitarType);
      dispatch(itemsSlice.actions.addTypeFilter(name as GuitarType));
    } else {
      filterGuitar = filterGuitar.filter((type: GuitarType) => type !== name);
      dispatch(itemsSlice.actions.deleteTypeFilter(name as GuitarType));
    }
    dispatch(getItemsAction({ ...query, page: 0, filterGuitar }));
  };

  const onStringsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = evt.target;
    if (checked) {
      filterString.push(parseInt(name, 10) as StringsNumber);
      dispatch(
        itemsSlice.actions.addStringFilter(parseInt(name, 10) as StringsNumber)
      );
    } else {
      filterString = filterString.filter(
        (num: StringsNumber) => num !== parseInt(name, 10)
      );
      dispatch(
        itemsSlice.actions.deleteStringFilter(
          parseInt(name, 10) as StringsNumber
        )
      );
    }
    dispatch(getItemsAction({ ...query, page: 0, filterString }));
  };

  return (
    <form className='catalog-filter' action='#' method='post'>
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>Тип гитар</legend>
        {Object.values(GuitarType).map((type) => (
          <ListCheckBox
            key={type}
            name={type}
            handleChange={onTypeChange}
            checked={filterGuitar.includes(type as GuitarType)}
          />
        ))}
      </fieldset>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>
          Количество струн
        </legend>
        {Object.values(StringsNumber)
          .filter((num) => typeof num === 'number')
          .map((number) => (
            <ListCheckBox
              key={number}
              name={number.toString()}
              handleChange={onStringsChange}
              checked={filterString.includes(number as StringsNumber)}
            />
          ))}
      </fieldset>
      <button
        className='catalog-filter__reset-btn button button--black-border button--medium'
        type='reset'
        onClick={() => {
          dispatch(itemsSlice.actions.removeFilters());
          dispatch(
            getItemsAction({
              ...query,
              page: 0,
              filterGuitar: [],
              filterString: [],
            })
          );
        }}
      >
        Очистить
      </button>
    </form>
  );
};

export default ListFilter;
