import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../types/namespace.enum';
import { GuitarType, Item, StringsNumber } from '../../types/item.type';
import { Query, SortDirection, SortType } from '../../types/query.type';
import {
  createItemAction,
  deleteItemAction,
  getItemAction,
  getItemsAction,
  updateItemAction,
} from '../api-actions/items-action';

const initialState = {
  items: [],
  item: null,
  total: 0,
  query: {
    page: 0,
    limit: 7,
    sortType: SortType.CreatedAt,
    sortDirection: SortDirection.Desc,
    filterGuitar: [] as GuitarType[],
    filterString: [] as StringsNumber[],
  },
} as {
  items: Item[];
  item: Item | null;
  total: number;
  query: Query;
};

export const itemsSlice = createSlice({
  name: Namespace.Items,
  initialState,
  reducers: {
    removeFilters: (state) => {
      state.query.filterGuitar = [];
      state.query.filterString = [];
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.query.sortDirection = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.query.sortType = action.payload;
    },
    addStringFilter: (
      state,
      action: PayloadAction<StringsNumber | StringsNumber[]>
    ) => {
      if (Array.isArray(action.payload)) {
        state.query.filterString = action.payload;
      } else {
        state.query.filterString.push(action.payload);
      }
    },
    addTypeFilter: (
      state,
      action: PayloadAction<GuitarType | GuitarType[]>
    ) => {
      if (Array.isArray(action.payload)) {
        state.query.filterGuitar = action.payload;
      } else {
        state.query.filterGuitar.push(action.payload);
      }
    },
    deleteTypeFilter: (state, action: PayloadAction<GuitarType>) => {
      state.query.filterGuitar = state.query.filterGuitar.filter(
        (type) => type !== action.payload
      );
    },
    deleteStringFilter: (state, action: PayloadAction<StringsNumber>) => {
      state.query.filterString = state.query.filterString.filter(
        (num) => num !== action.payload
      );
    },
    setItemToNull: (state) => {
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItemAction.fulfilled, (state, action) => {
        state.item = action.payload;
        state.total += 1;
      })
      .addCase(deleteItemAction.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.vendorCode !== action.payload.vendorCode
        );
        state.total -= 1;
      })
      .addCase(getItemAction.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(getItemsAction.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.query.page = action.payload.page;
        state.total = action.payload.total;
      })
      .addCase(updateItemAction.fulfilled, (state, action) => {
        state.item = action.payload;
        state.items = state.items.map((item) =>
          item.vendorCode === action.payload.vendorCode ? action.payload : item
        );
      });
  },
});
