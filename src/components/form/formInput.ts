import { formatCPF, formatPhone } from '../../utils/format.js';
import { getErrorMessage } from '../../utils/valid.js';

const formInputTemplate = document.createElement('template');
formInputTemplate.innerHTML = `
  <style>
    .input-container {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      margin-bottom:1rem;
    }

    .input {
      color: var(--gray-light);
      border: none;
      border-bottom: 2px solid var(--gray-light);
      padding: 1.4rem 0;   
      font-size: 1.2rem;
      background-color: transparent;
    }

    .input::placeholder {
      color: var(--gray-light);
    }
 
    .input:focus, .input:focus::placeholder {
      color: var(--gray-dark);
      border-bottom-color: var(--gray-dark);
      outline:none;
    }

    .input-invalid {
      color: var(--red-light);
      display:none;
    }
  </style>
 
  <div class="input-container">
    <input class="input" required/>
    <span class="input-invalid"></span>
  </div>
`;

export default class FormInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(formInputTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.mountInput();
    this.validInput();
    this.handleAddMaskInput();
  }

  mountInput() {
    const input = this.shadowRoot?.querySelector('.input') as HTMLInputElement;
    input.type = this.getAttribute('type') || '';
    input.name = this.getAttribute('id') || '';
    input.placeholder = this.getAttribute('placeholder') || '';
  }

  validInput() {
    const input = this.shadowRoot?.querySelector('.input') as HTMLInputElement;
    const errorMessage = this.shadowRoot?.querySelector(
      '.input-invalid'
    ) as HTMLSpanElement;

    input.addEventListener('change', (event: Event) => {
      const currentEvent = event?.currentTarget as HTMLInputElement;

      const { hasError, message } = getErrorMessage(
        currentEvent?.name,
        currentEvent.value
      );

      if (hasError) {
        errorMessage.innerHTML = message;
        this.displayErrorMessage(errorMessage, input, true);
      } else {
        this.displayErrorMessage(errorMessage, input, false);
      }
    });
  }

  displayErrorMessage(
    span: HTMLSpanElement,
    input: HTMLInputElement,
    show: boolean
  ) {
    if (show) {
      span.style.display = 'block';
      input.style.borderBottomColor = 'var(--red-light)';
    } else {
      span.style.display = 'none';
      input.style.borderBottomColor = 'inherit';
    }
  }

  handleAddMaskInput() {
    const input = this.shadowRoot?.querySelector('.input') as HTMLInputElement;

    input.addEventListener('keypress', (event: Event) => {
      const currentEvent = event?.currentTarget as HTMLInputElement;

      if (currentEvent?.name == 'cpf') {
        input.value = formatCPF(currentEvent.value);
      } else if (currentEvent?.name == 'phone') {
        input.value = formatPhone(currentEvent.value);
      }
    });
  }
}

customElements.define('form-input', FormInput);
