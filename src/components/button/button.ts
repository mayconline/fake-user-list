const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = `
  <style>
    .button {
      background-color: var(--blue-aqua);
      color: var(--white);
      font-size: 1.2rem;
      font-weight: 600;
      width: 100%;
      padding: 0.5rem 1rem;
      margin: 1rem 0;
      border: none;
      border-radius: 2rem;
      transition: opacity 0.2s;
      cursor: pointer;
      display:flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    
    .button:hover {
      opacity: 0.7;
    }
    
    .button:disabled {
      color: var(--gray-lightest);
      background-color: var(--white-light);
      pointer-events: none;
    }

    .button > .content {
      display:block;
     }

    .button > .loading {
      display: none;
      width: 2rem;
      height: 2rem;
      border: 4px solid transparent;
      border-color: #fff #fff transparent transparent;
      border-radius: 50%;
      animation: loading-animation 1.2s linear infinite;
    }
     
    @keyframes loading-animation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    svg {
      width: 2rem;
      margin: 0.5rem 0 0 0.2rem;      
    }

  
  </style>
  <button class="button" type="submit">
    <span class="loading"></span>
    <slot class="content" />
  </button>   
`;

class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(buttonTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.mountButton();
    this.handleSetLoading();
  }

  mountButton() {
    const kindButton = this.getAttribute('id');
    const button = this.shadowRoot?.querySelector(
      '.button'
    ) as HTMLButtonElement;

    switch (kindButton) {
      case 'form-button':
        button.appendChild(this.getSVG(kindButton));
        button.disabled =
          this.getAttribute('disabled') === 'true' ? true : false;
        break;
      case 'delete-button':
        button.style.backgroundColor = 'var(--red-light)';
        button.appendChild(this.getSVG(kindButton));
        break;
      case 'edit-button':
        button.style.backgroundColor = 'var(--blue-light)';
        button.appendChild(this.getSVG(kindButton));
        break;
      case 'add-button':
        button.style.backgroundColor = 'var(--green-light)';
        button.appendChild(this.getSVG(kindButton));
        break;
      default:
        break;
    }
  }

  getSVG(kindButton: string) {
    const icon = document.createElement('span');

    switch (kindButton) {
      case 'form-button':
        icon.innerHTML = `
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <path
              d="M29.932 1.286A.938.938 0 0 0 28.714.068L1.438 10.978h-.002l-.847.338a.938.938 0 0 0-.154 1.663l.769.487.002.004 9.365 5.959 2.981 4.684C15 26.25 15 24.375 15 23.438a8.438 8.438 0 0 1 9.424-8.382l5.508-13.77ZM26.496 4.83 12.444 18.881l-.403-.634a.937.937 0 0 0-.289-.288l-.633-.403 14.05-14.052 2.21-.883-.882 2.209h-.001Z"
              fill="#fff"
             />
            <path
              d="M30 23.438a6.563 6.563 0 1 1-13.125 0 6.563 6.563 0 0 1 13.125 0Zm-6.563-3.75a.938.938 0 0 0-.937.937V22.5h-1.875a.938.938 0 0 0 0 1.875H22.5v1.875a.938.938 0 0 0 1.875 0v-1.875h1.875a.938.938 0 0 0 0-1.875h-1.875v-1.875a.938.938 0 0 0-.938-.938Z"
              fill="#fff"
            />
          </svg>
        `;
        break;
      case 'delete-button':
        icon.innerHTML = `
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <path
              d="M5 7.5h20l-1.975 17.775A2.5 2.5 0 0 1 20.54 27.5H9.46a2.5 2.5 0 0 1-2.485-2.225L5 7.5Zm4.181-3.566A2.5 2.5 0 0 1 11.443 2.5h7.115a2.5 2.5 0 0 1 2.262 1.434L22.5 7.5h-15l1.681-3.566ZM2.5 7.5h25m-15 6.25V20m5-6.25V20"
              stroke="#fff"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        `;
        break;
      case 'edit-button':
        icon.innerHTML = `
         <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
          <path
            d="M3.416 18.06 18.712 2.763a3.2 3.2 0 0 1 4.526 4.523l-15.3 15.298a2.5 2.5 0 0 1-1.277.683l-4.911.983.982-4.913a2.5 2.5 0 0 1 .684-1.277v0Z"
            stroke="#fff"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="m16.125 6.125 3.75 3.75" stroke="#fff" stroke-width="2.5" />
        </svg>
         `;
        break;
      case 'add-button':
        icon.innerHTML = `
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
            <path
              d="M3.125 43.75S0 43.75 0 40.625s3.125-12.5 18.75-12.5S37.5 37.5 37.5 40.625s-3.125 3.125-3.125 3.125H3.125ZM18.75 25a9.375 9.375 0 1 0 0-18.75 9.375 9.375 0 0 0 0 18.75Z"
              fill="#fff"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M42.188 15.625a1.563 1.563 0 0 1 1.562 1.563v4.687h4.688a1.563 1.563 0 0 1 0 3.125H43.75v4.688a1.563 1.563 0 0 1-3.125 0V25h-4.688a1.563 1.563 0 0 1 0-3.125h4.688v-4.688a1.563 1.563 0 0 1 1.563-1.562Z"
              fill="#fff"
            />
          </svg>
      `;
        break;
      default:
        break;
    }

    return icon;
  }

  handleSetLoading() {
    this.addEventListener('click', () => {
      if (this.getAttribute('loading')) {
        const loading = this.shadowRoot?.querySelector(
          '.loading'
        ) as HTMLSpanElement;
        const text = this.shadowRoot?.querySelector(
          '.content'
        ) as HTMLSpanElement;
        const icon = this.shadowRoot?.querySelector('svg') as SVGElement;

        text.style.display = 'none';
        icon.style.display = 'none';
        loading.style.display = 'inline-block';
      }
    });
  }
}

customElements.define('action-button', Button);
