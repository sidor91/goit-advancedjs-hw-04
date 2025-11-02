import axios from 'axios';

const API_KEY = '33349547-44f128e159fc9ba4be7374396';
const BASE_URL = 'https://pixabay.com/api/';

const queryParams = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export async function fetchPhotos(query) {
  await new Promise(resolve => setTimeout(resolve, 5000))
  queryParams.q = query;
  const queryParamsObject = new URLSearchParams();

  for (const param in queryParams) {
    queryParamsObject.append(param, queryParams[param]);
  }

  const path = BASE_URL + '?' + queryParamsObject.toString();

  const response = await axios.get(path);

  return response.data.hits;
}
