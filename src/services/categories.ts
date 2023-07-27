import axios, { AxiosResponse } from 'axios';
import getConfig from 'next/config';
import { API_PATH, VERSION } from 'src/constants';

export const categoriesFetcher = async <T>(endpoint: string): Promise<T> => {
  try {
    const { publicRuntimeConfig } = getConfig();
    const response: AxiosResponse<T> = await axios.get(
      `${publicRuntimeConfig.SERVER_URL}${API_PATH}${VERSION}${endpoint}`
    );
    return response.data;
  } catch (error: any) {
    console.log('Error while fetching categories', error);
    throw error;
  }
};
