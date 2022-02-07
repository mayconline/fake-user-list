import ListItem from './listItem';

describe('ListItem', () => {
  it('should successfully display list item', () => {
    const element = new ListItem();

    element.setAttribute('name', 'Panqueca Silva');
    element.setAttribute('cpf', '11999977721');
    element.setAttribute('phone', '21943431212');
    element.setAttribute('email', 'teste@teste.com');

    document.body.appendChild(element);

    const listData = element.shadowRoot?.querySelector(
      '.list-data'
    ) as HTMLElement;

    expect(listData).toHaveTextContent('Nome: Panqueca Silva');
    expect(listData).toHaveTextContent('CPF: 119.999.777-21');
    expect(listData).toHaveTextContent('Telefone: (21) 9 4343-1212');
    expect(listData).toHaveTextContent('E-mail: teste@teste.com');
  });
});
