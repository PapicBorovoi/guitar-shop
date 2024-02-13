import { Namespace } from '../../types/namespace.enum';
import { State } from '../../types/store.type';

export const getUser = (state: Pick<State, Namespace.User>) =>
  state[Namespace.User].user;

export const getAuthStatus = (state: Pick<State, Namespace.User>) =>
  state[Namespace.User].authStatus;
