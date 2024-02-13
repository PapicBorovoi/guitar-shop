export const LoginError = {
  Empty: 'Заполните поле',
  InvalidEmail: 'Некорректный email',
  MinLenPassword: 'Минимальная длина пароля 6 символов',
  MaxLenPassword: 'Максимальная длина пароля 12 символов',
  InvalidLogin: 'Неверный логин или пароль',
  MinLenName: 'Минимальная длина имени 1 символа',
  MaxLenName: 'Максимальная длина имени 15 символов',
  EmailConflict: 'Пользователь с таким email уже зарегистрирован',
} as const;
