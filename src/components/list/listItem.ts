import { formatCPF, formatPhone } from '../../utils/format.js';

const listItemTemplate = document.createElement('template');
listItemTemplate.innerHTML = `
  <style>
    .list-item {
      padding: 1rem 1.6rem;
      border-radius: 0.5rem;
      display: grid;
      grid-template-columns: 4fr 1fr;   
      background-color: var(--white);
      box-shadow: 2px 5px 10px 0px var(--shadow);
    }

    .list-data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .list-data > p {
      margin: 0.5rem;
      font-size: 1.2rem;
      color: var(--gray-dark);
    }

    @media (max-width: 420px) {
      .list-item {
        grid-template-columns: 1fr;
      }

      .list-btn {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
      }
    }
  </style>
  <article class="list-item">
    <main class="list-data"></main>
    <aside class="list-btn">
      <slot/>
    </aside>
  </article>

`;

export default class ListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(listItemTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.mountItem();
  }

  mountItem() {
    const name = this.getAttribute('name') || '';
    const cpf = this.getAttribute('cpf') || '';
    const phone = this.getAttribute('phone') || '';
    const email = this.getAttribute('email') || '';

    const listData = this.shadowRoot?.querySelector(
      '.list-data'
    ) as HTMLElement;

    listData.innerHTML = `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>CPF:</strong> ${formatCPF(cpf)}</p>
      <p><strong>Telefone:</strong> ${formatPhone(phone)}</p>
      <p><strong>E-mail:</strong> ${email}</p>
    `;
  }
}

customElements.define('list-item', ListItem);
