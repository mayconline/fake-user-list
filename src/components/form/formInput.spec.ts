import FormInput from './formInput';
import userEvent from '@testing-library/user-event';

describe('formInput', () => {
  it('should successfully display input', async () => {
    const element = new FormInput();

    element.setAttribute('id', 'name');
    element.setAttribute('type', 'text');
    element.setAttribute('placeholder', 'Nome completo');

    document.body.appendChild(element);

    const input = element.shadowRoot?.querySelector(
      '.input'
    ) as HTMLInputElement;

    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'Nome completo');

    userEvent.type(input, 'Panqueca');
    expect(input.value).toBe('Panqueca');
  });

  it('should add mask when input cpf', () => {
    const element = new FormInput();

    element.setAttribute('id', 'cpf');
    element.setAttribute('type', 'text');
    element.setAttribute('placeholder', 'CPF');

    document.body.appendChild(element);

    const input = element.shadowRoot?.querySelector(
      '.input'
    ) as HTMLInputElement;

    expect(input).toHaveAttribute('name', 'cpf');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'CPF');

    userEvent.type(input, '11989043212');
    expect(input.value).toBe('119.890.432-12');
  });

  it('should add mask when input phone', () => {
    const element = new FormInput();

    element.setAttribute('id', 'phone');
    element.setAttribute('type', 'tel');
    element.setAttribute('placeholder', 'Telefone');

    document.body.appendChild(element);

    const input = element.shadowRoot?.querySelector(
      '.input'
    ) as HTMLInputElement;

    expect(input).toHaveAttribute('name', 'phone');
    expect(input).toHaveAttribute('type', 'tel');
    expect(input).toHaveAttribute('placeholder', 'Telefone');

    userEvent.type(input, '21954323410');
    expect(input.value).toBe('(21) 9 5432-3410');
  });
});
