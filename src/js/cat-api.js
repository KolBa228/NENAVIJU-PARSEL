const url = 'https://api.thecatapi.com/v1/breeds';
const api_key = 'live_VZ1SLbLWDxhfqJdDTkoccHIln3ksGsRzopmCmcFYOh2oF7OuabnBdzspIN63yDCR';

function fetchBreeds() {
  const loader = document.querySelector('.loader');
  const breedSelect = document.querySelector('.breed-select');
  const errorText = document.querySelector('.error');

  loader.textContent = 'Грузим, грузим загружаем';
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  errorText.textContent = '';

  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data = data.filter((breed) => breed.image?.url != null);
      storedBreeds = data;
    })
    .then(() => {
      populateBreedsSelect();
      loader.style.display = 'none';
      breedSelect.style.display = 'block';
    })
    .catch((error) => {
      console.log(error);
      errorText.textContent = 'Ошибка загрузки пород кошек!';
      loader.style.display = 'none';
    });
}

export { fetchBreeds };
    
function fetchCatByBreed(breedId) {
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');
  const errorText = document.querySelector('.error');
  const breedImage = document.getElementById('breed_image');
  const breedDesc = document.getElementById('breed_json');

  loader.style.display = 'block';
  catInfo.style.display = 'none';
  errorText.textContent = '';

  breedImage.style.display = 'none';
  breedDesc.textContent = '';

  const breed = storedBreeds[breedId];
  const breedImageURL = breed.image.url;
  const breedName = breed.name;
  const breedDescription = breed.description;
  const breedTemperament = breed.temperament;

  const breedInfo = {
    breedImageURL,
    breedName,
    breedDescription,
    breedTemperament,
  };

  const queryParams = new URLSearchParams({
    breed_ids: breed.id,
  });

  const apiUrl = `https://api.thecatapi.com/v1/images/search?${queryParams}`;

  return fetch(apiUrl, {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const catData = data[0];

      breedInfo.breedImageURL = catData.url;
      breedInfo.breedId = catData.breeds[0].id;

      return breedInfo;
    })
    .then((breedInfo) => {
      breedImage.src = breedInfo.breedImageURL;
      breedImage.style.display = 'block';
      breedDesc.textContent = breedInfo.breedDescription;
      loader.style.display = 'none';
      catInfo.style.display = 'block';
    })
    .catch((error) => {
      console.log(error);
      errorText.textContent = 'Ошибка загрузки информации о коте!';
        loader.style.display = 'none';
        breedImage.style.display = 'none';
    });
}

export { fetchCatByBreed };
    
    function populateBreedsSelect() {
  const breedSelector = document.querySelector('.breed-select');

  for (let i = 0; i < storedBreeds.length; i += 1) {
    const breed = storedBreeds[i];
    let option = document.createElement('option');

    option.value = i;
    option.innerHTML = `${breed.name}`;
    breedSelector.appendChild(option);
  }
    }

    function updateCatInfo(breedInfo) {
  const breedImage = document.getElementById('breed_image');
  const breedDescription = document.getElementById('breed_json');


  breedImage.src = breedInfo.breedImage;
  breedDescription.textContent = breedInfo.breedDescription;
};

    export { updateCatInfo };

