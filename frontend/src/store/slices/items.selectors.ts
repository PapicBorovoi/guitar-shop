import { Namespace } from '../../types/namespace.enum';
import { State } from '../../types/store.type';

export const getItem = (state: Pick<State, Namespace.Items>) =>
  state[Namespace.Items].item;

export const getItems = (state: Pick<State, Namespace.Items>) =>
  state[Namespace.Items].items;

export const getQuery = (state: Pick<State, Namespace.Items>) =>
  state[Namespace.Items].query;

export const getTotal = (state: Pick<State, Namespace.Items>) =>
  state[Namespace.Items].total;

export const getPage = (state: Pick<State, Namespace.Items>) =>
  state[Namespace.Items].query.page;

export const getLimit = (state: Pick<State, Namespace.Items>) =>
  state[Namespace.Items].query.limit;
