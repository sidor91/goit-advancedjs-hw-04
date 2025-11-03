const loaderContainer = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('#searchForm');

export function showLoader() {
  loaderContainer.style.display = 'flex';
}

export function hideLoader() {
  loaderContainer.style.display = 'none';
}

export function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

export function resetGallery() {
  gallery.innerHTML = '';
}

export function resetFormInput() {
  form.search.value = '';
}