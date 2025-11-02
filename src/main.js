import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos } from './js/pixabay-api';
import {renderGallery} from './js/render-functions';

const form = document.querySelector('#searchForm');
const loaderContainer = document.querySelector('.loader-container');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = form.search.value;

  const isEmptyQuery = query.trim().length === 0;

  if (isEmptyQuery) {
    iziToast.info({
      message: 'Search should not be empty!',
    });
    return;
  }

  try {
    loaderContainer.style.display = 'flex';
    const photos = await fetchPhotos(query);

    if (!photos.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    form.search.value = '';
    renderGallery(photos);
  } catch (error) {
    iziToast.error({
      message: `Oooops...Something went wrong... ${error.message}`,
    });
  } finally {
    loaderContainer.style.display = 'none';
  }
});
