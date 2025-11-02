import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const gallery = document.querySelector('.gallery');

function getCardMarkup(item) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;
  return `
        <div class="photo-card">
          <a href="${largeImageURL}" target="_blank">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <div class="info-item"><b>${likes}</b>Likes</div>
            <div class="info-item"><b>${views}</b>Views</div>
            <div class="info-item"><b>${comments}</b>Comments</div>
            <div class="info-item"><b>${downloads}</b>Downloads</div>
          </div>
        </div>`;
}

export function renderGallery(list){
  const markup = list.map(item => getCardMarkup(item)).join('');
  gallery.innerHTML = ''; 
  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}