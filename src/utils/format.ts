export const formatMask = (value: string, mask: string) => {
  let index = 0;

  const rawValue = getRawValue(value);
  const maskValue = mask.replace(/9/g, () => rawValue[index++] || '');

  return maskValue;
};

export const formatCPF = (cpf: string) => {
  return formatMask(cpf, '999.999.999-99');
};

export const formatPhone = (phone: string) => {
  const rawValue = getRawValue(phone);

  const mask = rawValue.length < 10 ? '(99) 9999-9999' : '(99) 9 9999-9999';

  return formatMask(phone, mask);
};

export const getRawValue = (value: string) => {
  return value.replace(/\D/g, '').trim();
};
