import Cookies from 'js-cookie';

const AUTH_TOKEN_NAME = 'token';

const getToken = () => Cookies.get(AUTH_TOKEN_NAME) ?? '';

const setToken = (token: string) => Cookies.set(AUTH_TOKEN_NAME, token);

const removeToken = () => Cookies.remove(AUTH_TOKEN_NAME);

export { getToken, setToken, removeToken };
