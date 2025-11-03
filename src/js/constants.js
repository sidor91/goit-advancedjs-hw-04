const API_KEY = '33349547-44f128e159fc9ba4be7374396';
export const BASE_URL = 'https://pixabay.com/api/';
export const DEFAULT_PER_PAGE = 15;

export const defaultQueryParams = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 15,
};

export const defaultState = {
  query: '',
  totalHits: 0,
  currentPage: 0,
}