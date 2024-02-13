import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/store.type';
import { AxiosInstance } from 'axios';
import { ApiRoutes } from '../../types/api-routes.enum';
import { CreateItem, Item } from '../../types/item.type';
import { Query } from '../../types/query.type';

export const createItemAction = createAsyncThunk<
  Item,
  CreateItem,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('createItem', async (item, { extra: api }) => {
  const response = await api.post<Item>(ApiRoutes.CreateItem, item);
  return response.data;
});

export const deleteItemAction = createAsyncThunk<
  Item,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('deleteItem', async (vendorCode, { extra: api }) => {
  const response = await api.delete<Item>(ApiRoutes.DeleteItem(vendorCode));
  return response.data;
});

export const getItemAction = createAsyncThunk<
  Item,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('getItem', async (vendorCode, { extra: api }) => {
  const response = await api.get<Item>(ApiRoutes.GetItem(vendorCode));
  return response.data;
});

export const getItemsAction = createAsyncThunk<
  { items: Item[]; page: number; total: number },
  Query,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('getItems', async (query, { extra: api }) => {
  const response = await api.get<{
    items: Item[];
    page: number;
    total: number;
  }>(ApiRoutes.GetItems, { params: query });
  return response.data;
});

export const updateItemAction = createAsyncThunk<
  Item,
  { item: CreateItem; oldVendorCode: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('updateItem', async (item, { extra: api }) => {
  const response = await api.patch<Item>(
    ApiRoutes.UpdateItem(item.oldVendorCode),
    item.item
  );
  return response.data;
});
