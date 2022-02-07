import Button from './button';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

describe('button', () => {
  afterEach(() => {
    document.body.firstChild?.remove();
  });

  it('should successfully display button', async () => {
    const element = new Button();
    element.innerHTML = 'Cadastrar';

    element.setAttribute('id', 'add-button');
    element.setAttribute('type', 'button');

    document.body.appendChild(element);

    screen.getByText('Cadastrar');

    const button = element.shadowRoot?.querySelector(
      '.button',
    ) as HTMLButtonElement;

    expect(button).toBeVisible();
  });

  it('should successfully display disabled button', async () => {
    const element = new Button();
    element.innerHTML = 'Cadastrar';

    element.setAttribute('id', 'form-button');
    element.setAttribute('type', 'submit');
    element.setAttribute('disabled', 'true');

    document.body.appendChild(element);

    screen.getByText('Cadastrar');

    const button = element.shadowRoot?.querySelector(
      '.button',
    ) as HTMLButtonElement;

    expect(button).toBeVisible();
    expect(button).toHaveProperty('disabled', true);
  });

  it('should successfully display loading button', async () => {
    const element = new Button();
    element.innerHTML = 'Cadastrar';

    element.setAttribute('id', 'form-button');
    element.setAttribute('type', 'submit');
    element.setAttribute('loading', 'true');

    document.body.appendChild(element);

    screen.getByText('Cadastrar');

    const button = element.shadowRoot?.querySelector(
      '.button',
    ) as HTMLButtonElement;

    userEvent.click(button);

    const loading = element.shadowRoot?.querySelector(
      '.loading',
    ) as HTMLSpanElement;

    expect(loading.style.display).toBe('inline-block');
    expect(loading).toBeVisible();
  });
});
