import { User } from '../types';

export const setStorageList = (dataList: User[]) => {
  return localStorage.setItem('@dataList', JSON.stringify(dataList));
};

export const getStorageList = () => {
  let getLocalStorage = [] as User[];

  const storeList = localStorage?.getItem('@dataList');

  if (!!storeList) {
    getLocalStorage = JSON.parse(storeList) as User[];
  }

  return getLocalStorage;
};
