import ListContainer from './listContainer';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import { setStorageList } from '../../utils/storage.js';

jest.mock('../../utils/storage.js', () => ({
  ...jest.requireActual('../../utils/storage.js'),
  setStorageList: jest.fn(),
}));

describe('ListContainer', () => {
  afterEach(() => {
    document.body.firstChild?.remove();
  });

  it('should successfully fetch users list', async () => {
    const element = new ListContainer();

    document.body.appendChild(element);

    await waitFor(() => expect(setStorageList).toHaveBeenCalledTimes(1));
    expect(setStorageList).toHaveBeenNthCalledWith(1, STORAGE_MOCK);

    const container = element.shadowRoot?.querySelector(
      '.list-container',
    ) as HTMLElement;

    const listItems = container.querySelectorAll('list-item');
    expect(listItems).toHaveLength(3);

    expect(listItems[0]).toHaveAttribute('cpf', '04080757247');
    expect(listItems[0]).toHaveAttribute('email', 'myemail1@test.com.br');
    expect(listItems[0]).toHaveAttribute('name', 'My name 1');
    expect(listItems[0]).toHaveAttribute('phone', '11987654321');

    const actionButtons = listItems[0].querySelectorAll('action-button');
    expect(actionButtons).toHaveLength(2);

    expect(actionButtons[0]).toHaveAttribute('id', 'delete-button');
    expect(actionButtons[1]).toHaveAttribute('id', 'edit-button');
  });

  it('should successfully remove item list', async () => {
    const element = new ListContainer();

    document.body.appendChild(element);

    await waitFor(() => expect(setStorageList).toHaveBeenCalledTimes(1));
    expect(setStorageList).toHaveBeenNthCalledWith(1, STORAGE_MOCK);

    const container = element.shadowRoot?.querySelector(
      '.list-container',
    ) as HTMLElement;

    const listItems = container.querySelectorAll('list-item');

    const deleteButton = listItems[0].querySelector(
      '#delete-button',
    ) as HTMLButtonElement;

    userEvent.click(deleteButton);

    await waitFor(() => expect(setStorageList).toHaveBeenCalledTimes(2));
    expect(setStorageList).toHaveBeenNthCalledWith(
      2,
      STORAGE_MOCK.filter(list => list.id !== 'list-0'),
    );
  });

  it('should successfully diplay empty svg', async () => {
    const element = new ListContainer();

    document.body.appendChild(element);

    await waitFor(() => expect(setStorageList).toHaveBeenCalledTimes(1));
    expect(setStorageList).toHaveBeenNthCalledWith(1, STORAGE_MOCK);

    const container = element.shadowRoot?.querySelector(
      '.list-container',
    ) as HTMLElement;

    const listItems = container.querySelectorAll('list-item');

    listItems.forEach(item =>
      userEvent.click(item.querySelector('#delete-button') as HTMLElement),
    );

    await waitFor(() => expect(setStorageList).toHaveBeenCalledTimes(4));
    expect(setStorageList).toHaveBeenNthCalledWith(4, []);

    const emptyContainer = element.shadowRoot?.querySelector(
      '.empty-container',
    ) as HTMLElement;

    const emptySVG = emptyContainer.querySelector('img');

    expect(emptySVG).toHaveAttribute('src', './public/assets/empty_list.svg');
    expect(emptySVG).toHaveAttribute('alt', 'Lista Vazia');
  });
});

const MOCK_USER_LIST = [
  {
    name: 'My name 1',
    cpf: '04080757247',
    phone: '11987654321',
    email: 'myemail1@test.com.br',
  },
  {
    name: 'My name 2',
    cpf: '77797584192',
    phone: '11987654321',
    email: 'myemail2@test.com.br',
  },
  {
    name: 'My name 3',
    cpf: '45486737688',
    phone: '11987654321',
    email: 'myemail3@test.com.br',
  },
];

const STORAGE_MOCK = MOCK_USER_LIST.map((list, index) => ({
  ...list,
  id: `list-${index}`,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: jest.fn().mockImplementation(() => Promise.resolve(MOCK_USER_LIST)),
  }),
) as jest.Mock;
