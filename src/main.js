import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos, DEFAULT_PER_PAGE } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const form = document.querySelector('#searchForm');
const loaderContainer = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');

const LS_KEY = 'queryParams';

form.addEventListener('submit', async e => {
  e.preventDefault();
  localStorage.removeItem(LS_KEY);
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  const query = form.search.value.trim();

  if (!query.length) {
    iziToast.info({
      message: 'Search should not be empty!',
    });
    return;
  }

  try {
    loaderContainer.style.display = 'flex';
    const response = await fetchPhotos({ query });

    if (!response.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ query, totalHits: response.totalHits, currentPage: 1 })
    );

    form.search.value = '';
    renderGallery(response.hits);
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    iziToast.error({
      message: `Oooops...Something went wrong... ${error.message}`,
    });
    loadMoreBtn.style.display = 'none';
  } finally {
    loaderContainer.style.display = 'none';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  try {
    loaderContainer.style.display = 'flex';
    loadMoreBtn.style.display = 'none';

    const queryParams = JSON.parse(localStorage.getItem(LS_KEY));

    if (!queryParams || !Object.keys(queryParams).length) {
      return;
    }

    const { query, currentPage, totalHits } = queryParams;

    let limit = DEFAULT_PER_PAGE;
    const alreadyRenderedAmount = currentPage * limit;
    const amountLeft = totalHits - alreadyRenderedAmount;

    if (amountLeft <= 0) {
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.style.display = 'none';
      return;
    }

    if (amountLeft < limit) {
      limit = amountLeft;
    }

    const response = await fetchPhotos({ query, page: currentPage + 1, limit });

    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ query, currentPage: currentPage + 1, totalHits })
    );

    renderGallery(response.hits);

    const card = document.querySelector('.photo-card');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    loadMoreBtn.style.display = 'block';
  } catch (error) {
    iziToast.error({
      message: `Oooops...Something went wrong... ${error.message}`,
    });
  } finally {
    loaderContainer.style.display = 'none';
  }
});
