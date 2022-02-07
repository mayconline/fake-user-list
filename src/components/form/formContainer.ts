import { User } from '../../types';
import { getRawValue } from '../../utils/format.js';
import { getStorageList, setStorageList } from '../../utils/storage.js';
import { hasSomeInvalidInput } from '../../utils/valid.js';

const formContainerTemplate = document.createElement('template');
formContainerTemplate.innerHTML = `
  <style>
    main {
      display: flex;
      justify-content: center;
      margin:1.6rem; 
    }

    form {
      padding: 1.6rem;
      background-color: var(--gray);
      border-radius: 0.5rem;
      width: 600px;
      box-shadow: 2px 5px 10px 0px var(--shadow);
    }
  </style>

  <main>
    <form>
      <slot />
    </form> 
  <main>   
`;

export default class FormContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(formContainerTemplate.content.cloneNode(true));
  }

  async connectedCallback() {
    await this.handleSubmit();
  }

  async handleSubmit() {
    const button = document.querySelector('#form-button') as HTMLElement;
    const slotName = document.querySelector('#name') as HTMLElement;
    const slotCPF = document.querySelector('#cpf') as HTMLElement;
    const slotPhone = document.querySelector('#phone') as HTMLElement;
    const slotEmail = document.querySelector('#email') as HTMLElement;

    button.addEventListener('click', async () => {
      const storeList: User[] = getStorageList();

      const sequenceID: string =
        storeList[storeList?.length - 1]?.id?.split('-')[1] || '1';

      const stateForm = {
        id: `list-${Number(sequenceID) + 1}`,
        name: (
          slotName?.shadowRoot?.querySelector('.input') as HTMLInputElement
        )?.value,
        cpf: getRawValue(
          (slotCPF?.shadowRoot?.querySelector('.input') as HTMLInputElement)
            ?.value
        ),
        phone: getRawValue(
          (slotPhone?.shadowRoot?.querySelector('.input') as HTMLInputElement)
            ?.value
        ),
        email: (
          slotEmail?.shadowRoot?.querySelector('.input') as HTMLInputElement
        )?.value,
      } as User;

      const { hasError } = hasSomeInvalidInput(stateForm);

      if (!hasError) {
        button.setAttribute('loading', 'true');

        storeList.push(stateForm);
        setStorageList(storeList);

        setTimeout(() => window.location.assign('./'), 1000);
      }
    });
  }
}

customElements.define('form-container', FormContainer);
