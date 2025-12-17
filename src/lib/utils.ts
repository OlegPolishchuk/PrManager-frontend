import type { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

import { DEFAULT_DATE_FORMAT } from '@/lib/constants.ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/******************************************* */
/******************************************* */
/******************************************* */
/* Функция для извлечения сообщения ошибки */
interface AxiosErrorResponseData {
  debug: string;
  error: string;
  success: boolean;
  validation_error: string | null;
  message: string;
}

export function extractAxiosError(err: Error) {
  const error = err as AxiosError;
  const errorData = error.response?.data as AxiosErrorResponseData;
  const message: string = errorData.message;
  const validationMessage: string = errorData.validation_error ?? '';

  return {
    status: error.status,
    message,
    validationMessage,
  };
}

export function handleError(err: Error, errorConstant: Record<string, string>) {
  const error = err as AxiosError;
  const errorData = error.response?.data as AxiosErrorResponseData;
  const message: string = errorData.message;
  const validationMessage: string = errorData.validation_error ?? '';

  if (errorConstant[message]) {
    return toast.error('Ошибка!', { description: errorConstant[message] });
  }

  if (errorConstant[validationMessage]) {
    return toast.error('Ошибка!', { description: errorConstant[validationMessage] });
  }

  return toast.error(`Ошибка!`, {
    description: `${message || error.response?.data}`,
  });
}

/******************************************* */
/******************************************* */
/******************************************* */
/* Функция для форматирования дат с помощью dayjs */
export function formatDate(date: string | Date | undefined, format = DEFAULT_DATE_FORMAT) {
  return dayjs(date).format(format);
}
