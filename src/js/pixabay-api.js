import axios from 'axios';

const API_KEY = '33349547-44f128e159fc9ba4be7374396';
const BASE_URL = 'https://pixabay.com/api/';
export const DEFAULT_PER_PAGE = 15;

const queryParams = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 15,
};

export async function fetchPhotos(payload) {
  const {query, page = 1, limit = DEFAULT_PER_PAGE} = payload;

  await new Promise(resolve => setTimeout(resolve, 5000));

  const queryParamsObject = new URLSearchParams({
    ...queryParams,
    q: query,
    page,
    per_page: limit
  });

  const path = BASE_URL + '?' + queryParamsObject.toString();

  const response = await axios.get(path);

  return response.data;
}
