

import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

fetchBreeds()
  .catch((error) => {
    console.log(error);
    document.querySelector('.error').textContent = 'нема котика';
  });

document.querySelector('.breed-select').addEventListener('change', (event) => {
  const breedId = event.target.value;
  fetchCatByBreed(breedId);
});
