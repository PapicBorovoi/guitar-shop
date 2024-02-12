export type User = {
  id: number;
  email: string;
  name: string;
  accessToken: string;
};

export type UserRegister = {
  email: string;
  name: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
