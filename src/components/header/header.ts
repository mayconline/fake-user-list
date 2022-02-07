const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
  <style>
    .header-container {
      display: grid;
      grid-template-columns: 5fr 1fr; 
      align-items: center;
      background-color: var(--blue-aqua);
    }

    .header-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 1rem 2rem;
    }

    .header-left > h1 {
      color: var(--white);
      font-size: 1.6rem;
    }

    .header-left > svg {
      width:4rem;
      height:3rem;
    }

    .header-right {
      margin-right: 2rem;
    }
  </style>
  <header class="header-container">
    <main class="header-left">   
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M.984 1.95A.975.975 0 0 0 0 2.925v27.413a.975.975 0 0 0 .564.884l7.372 3.424c.012-.693.057-1.39.163-2.074L1.95 29.716V4.453l10.637 4.941.046 7.861a6.3 6.3 0 0 1 1.164-.926l-.039-6.793L24.942 4.34l.06 10.469c.364-.29.754-.547 1.165-.767l-.056-9.84L37.05 9.284v11.244c.001.087.002.173 0 .26v6.98a7.525 7.525 0 0 1 1.95 2.16V8.663a.975.975 0 0 0-.564-.884L26.086 2.04a.975.975 0 0 0-.822 0l-11.94 5.546L1.387 2.04a.975.975 0 0 0-.402-.091Zm11.7 24.264v.18c.042-.016.082-.037.124-.052-.044-.041-.082-.086-.125-.128Z"
          fill="#fff"
        />
        <path
          d="M29.64 14.73a5.85 5.85 0 1 0 0 11.7 5.85 5.85 0 0 0 0-11.7Zm0 12.567c-6.462 0-9.36 2.898-9.36 9.36v.78c.03 1.537.709 1.582 2.145 1.56h14.43c1.831-.002 2.158.002 2.145-1.56v-.78c0-6.462-2.898-9.36-9.36-9.36ZM17.16 16.922a4.794 4.794 0 1 0 .001 9.588 4.794 4.794 0 0 0-.001-9.588Zm0 10.296c-5.294 0-7.669 2.376-7.669 7.67v.639c.024 1.259.58 1.296 1.757 1.278h7.458c-.19-3.155.742-6.505 3.062-8.634-1.174-.642-2.7-.953-4.608-.953Z"
          fill="#fff"
        />
      </svg>
      <h1>User List</h1>
    </main>
    <aside class="header-right">
      <slot/>
    </aside>
  </header>

`;

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(headerTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.handleNavigate();
  }

  handleNavigate() {
    const button = document.querySelector('#add-button') as HTMLElement;

    if (button) {
      button.addEventListener('click', () => {
        window.location.assign('./form.html');
      });
    }
  }
}

customElements.define('header-nav', Header);
