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
  const breedName = breed.name;
  const breedDescription = breed.description;
  const breedTemperament = breed.temperament;

  const breedInfo = {
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
      if (Array.isArray(data) && data.length > 0) {
        const catData = data[0];

        breedInfo.breedImageURL = catData.url;
        breedInfo.breedId = catData.breeds[0].id;
      } else {
        throw new Error('Ошибка загрузки информации о коте!');
      }
    })
    .then(() => {
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
