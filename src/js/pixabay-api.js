import axios from 'axios';
import {BASE_URL, DEFAULT_PER_PAGE, defaultQueryParams} from './constants';

export async function fetchPhotos(payload) {
  const {query, page = 1, limit = DEFAULT_PER_PAGE} = payload;

  await new Promise(resolve => setTimeout(resolve, 5000));

  const queryParamsObject = new URLSearchParams({
    ...defaultQueryParams,
    q: query,
    page,
    per_page: limit
  });

  const path = BASE_URL + '?' + queryParamsObject.toString();

  const response = await axios.get(path);

  return response.data;
}
