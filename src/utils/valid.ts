import { User } from '../types';
import { getRawValue } from './format.js';

export const getErrorMessage = (name: string, value: string) => {
  let hasError = false;
  let message = '';

  switch (name) {
    case 'name':
      if (value.length < 3) {
        message = 'Nome deve conter 3 caracteres ou mais';
        hasError = true;
      }
      break;
    case 'cpf':
      if (getRawValue(value).length !== 11) {
        message = 'CPF inválido';
        hasError = true;
      }
      break;
    case 'phone':
      if (getRawValue(value).length < 10 || getRawValue(value).length > 11) {
        message = 'Campo deve conter 10 ou 11 caracteres';
        hasError = true;
      }
      break;
    case 'email':
      if (value.length < 3) {
        message = 'E-mail inválido';
        hasError = true;
      }
      break;
    default:
      hasError = false;
      break;
  }

  return {
    hasError,
    message,
  };
};

export const hasSomeInvalidInput = (stateform: User) => {
  const hasSomeError = Object.entries(stateform).map(state => {
    const { hasError } = getErrorMessage(state[0], state[1]);
    return hasError;
  });

  const hasError = hasSomeError.some(error => Boolean(error));

  return {
    hasError,
  };
};
