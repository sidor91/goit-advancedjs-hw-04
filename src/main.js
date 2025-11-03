import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import {
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  resetGallery,
  resetFormInput,
} from './js/helpers';
import { DEFAULT_PER_PAGE, defaultState } from './js/constants';

const form = document.querySelector('#searchForm');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentState = {
  query: '',
  totalHits: 0,
  currentPage: 0,
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = form.search.value.trim();

  if (!searchQuery.length) {
    iziToast.info({
      message: 'Search should not be empty!',
    });
    return;
  }

  resetGallery();
  hideLoadMoreBtn();
  currentState = { ...defaultState, query: searchQuery };

  try {
    showLoader();
    const response = await fetchPhotos({ query: searchQuery });

    if (!response.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    currentState.totalHits = response.totalHits;
    currentState.currentPage += 1;

    resetFormInput();
    renderGallery(response.hits);

    if (response.totalHits > DEFAULT_PER_PAGE) {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      message: `Oooops...Something went wrong... ${error.message}`,
    });
    hideLoadMoreBtn();
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  try {
    showLoader();
    hideLoadMoreBtn();

    const { query, currentPage, totalHits } = currentState;

    const alreadyRenderedAmount = currentPage * DEFAULT_PER_PAGE;
    const amountLeft = totalHits - alreadyRenderedAmount;

    if (amountLeft <= 0) {
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    const response = await fetchPhotos({ query, page: currentPage + 1 });

    currentState.currentPage += 1;

    renderGallery(response.hits);

    const card = document.querySelector('.photo-card');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    showLoadMoreBtn();
  } catch (error) {
    iziToast.error({
      message: `Oooops...Something went wrong... ${error.message}`,
    });
  } finally {
    hideLoader();
  }
});
