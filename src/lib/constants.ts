export const REQUIRED_MESSAGE = 'Поле обязательно для заполнения';

export const ERROR_MESSAGES: Record<string, string> = {
  ['User already exists']: 'Пользователь с таким email уже существует!',
  ['Введен неправильный код подтверждения']: 'Введен неправильный код подтверждения',
  ['Unauthorized']: 'Пользователя с такими данными не существет!',
};

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  ['Unauthorized']: 'Пользователя с такими данными не существует! Проверьте email или пароль!',
  ['User with email already exists']: 'Такой email уже зарегистрирован в системе!',
};
