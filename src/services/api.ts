import { User } from '../types';

export const handlefetchApi = async (route: string) => {
  let resultJson = [] as User[];

  try {
    const result = await fetch(
      `https://private-847f5-ivangenesis.apiary-mock.com/${route}`,
    );

    if (!!result) {
      resultJson = (await result.json()) as User[];
    }

    return resultJson;
  } catch (e) {
    console.log('error', e);

    return resultJson;
  }
};
