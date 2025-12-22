export const REQUIRED_MESSAGE = 'Поле обязательно для заполнения';
export const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY';
export const DEFAULT_STALE_TIME = 60 * 60 * 1000;
export const DEFAULT_PROJECT_COLOR = 'transparent';

export const ERROR_MESSAGES: Record<string, string> = {
  ['User already exists']: 'Пользователь с таким email уже существует!',
  ['Введен неправильный код подтверждения']: 'Введен неправильный код подтверждения',
  ['Unauthorized']: 'Пользователя с такими данными не существет!',
};

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  ['Unauthorized']: 'Пользователя с такими данными не существует! Проверьте email или пароль!',
  ['User with email already exists']: 'Такой email уже зарегистрирован в системе!',
  ['Wrong Password']: 'Неверный пароль!',
};
