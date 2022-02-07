import { handlefetchApi } from '../../services/api.js';
import { User } from '../../types';
import { setStorageList, getStorageList } from '../../utils/storage.js';

const listContainerTemplate = document.createElement('template');
listContainerTemplate.innerHTML = `
  <style>
    .list-container {
      border-radius: 0.5rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);  
      grid-gap: 1.6rem;
      margin: 1.6rem;
    }

    .empty-container {
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
    }

    .empty-container > img {
      width:20rem;
      height:20rem;
    }

    @media (max-width: 1080px) {
      .list-container {
        grid-template-columns: 1fr;
      }
    }
  </style>
  <main class="list-container"></main>
`;

export default class ListContainer extends HTMLElement {
  dataList: User[];

  constructor() {
    super();
    this.dataList = [] as User[];

    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(listContainerTemplate.content.cloneNode(true));
  }

  async connectedCallback() {
    await this.fetchUsersList();
    this.listItems();
    this.handleDeleteItemList();
    this.handleEditItemList();
    this.handleDisplayEmptyList();
  }

  async fetchUsersList() {
    const storeList = getStorageList();

    if (!!storeList.length) {
      this.dataList = storeList;
    } else {
      const resultJson = await handlefetchApi('users');

      const dataList = resultJson?.map((data, index) => ({
        ...data,
        id: `list-${index}`,
      }));

      setStorageList(dataList);
      this.dataList = dataList;
    }
  }

  listItems() {
    const container = this.shadowRoot?.querySelector(
      '.list-container'
    ) as HTMLElement;

    this.dataList.forEach((listItem, index) => {
      const listItems = this.createListItem(listItem, index);
      container.appendChild(listItems);
    });
  }

  createListItem(item: User, index: number) {
    const { name, cpf, phone, email } = item;

    const el = document.createElement('section');
    el.id = item?.id || `list-${index}`;
    el.innerHTML = `
    <list-item 
      id=${item?.id || `list-${index}`} 
      name=${JSON.stringify(name)} 
      cpf=${cpf} 
      phone=${phone} 
      email=${email}
    >
      <action-button id="delete-button" type="button">Excluir</action-button>
      <action-button id="edit-button" type="button">Editar</action-button>
    </list-item>`;

    return el;
  }

  deleteStorageList(id: string) {
    const updatedDataList = this.dataList.filter((list) => list.id !== id);

    const container = this.shadowRoot?.querySelector(
      '.list-container'
    ) as HTMLElement;
    const removedItem = this.shadowRoot?.querySelector(`#${id}`) as HTMLElement;

    container.removeChild(removedItem);

    setStorageList(updatedDataList);
    this.dataList = updatedDataList;
  }

  handleDeleteItemList() {
    const deleteButtons = this.shadowRoot?.querySelectorAll('#delete-button');

    deleteButtons?.forEach((button) => {
      const currentButton = button?.parentNode as HTMLElement;
      const id = currentButton?.getAttribute('id') as string;

      button.addEventListener('click', () => {
        this.deleteStorageList(id);
      });
    });
  }

  handleEditItemList() {
    const editButtoms = this.shadowRoot?.querySelectorAll('#edit-button');

    editButtoms?.forEach((button) => {
      const currentButton = button?.parentNode as HTMLElement;
      const id = currentButton?.getAttribute('id') as string;

      button.addEventListener('click', () => {
        window.location.assign(`./form.html?id=${id}`);
      });
    });
  }

  handleDisplayEmptyList() {
    this.addEventListener('click', () => {
      const hasCreatedImgContainer = Boolean(
        this.shadowRoot?.querySelector('.empty-container')
      );

      if (this.dataList.length == 0 && !hasCreatedImgContainer) {
        const imgContainer = document.createElement('section');
        imgContainer.classList.add('empty-container');

        const imgEmpty = document.createElement('img');
        imgEmpty.src = './public/assets/empty_list.svg';
        imgEmpty.alt = 'Lista Vazia';

        imgContainer.appendChild(imgEmpty);

        this.shadowRoot?.appendChild(imgContainer);
      }
    });
  }
}

customElements.define('list-container', ListContainer);
