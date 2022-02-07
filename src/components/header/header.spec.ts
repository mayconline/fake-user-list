import Header from './header';

describe('header', () => {
  it('should display header', () => {
    const element = new Header();

    document.body.appendChild(element);

    const title = element.shadowRoot?.querySelector('h1');
    expect(title?.textContent).toBe('User List');
  });
});
