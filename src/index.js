const url = `https://api.thecatapi.com/v1/breeds`;
const api_key = "live_VZ1SLbLWDxhfqJdDTkoccHIln3ksGsRzopmCmcFYOh2oF7OuabnBdzspIN63yDCR";
let storedBreeds = [];

function fetchBreeds() {
  return fetch(url, {
    headers: {
      'x-api-key': api_key
    }
  })
    .then((response) => {
      ;
      return response.json();
    })
    .then((data) => {
      data = data.filter((breed) => breed.image?.url != null);
      storedBreeds = data;
    })
     .then(() => {
      document.querySelector('.loader').textContent = '';
    })
    .catch((error) => {
      console.log(error);
      document.querySelector('.error').textContent = "Ошибка загрузки пород кошек!";
    });
}

function populateBreedsSelect() {
  const breedSelector = document.querySelector('.breed-select');

  for (let i = 0; i < storedBreeds.length; i++) {
    const breed = storedBreeds[i];
    let option = document.createElement('option');

    option.value = i;
    option.innerHTML = `${breed.name}`;
    breedSelector.appendChild(option);
  }
}

// function updateBreedInfo(index) {
//   const breedImage = document.getElementById('breed_image');
//   const breedDescription = document.getElementById('breed_json');

//   breedImage.src = storedBreeds[index].image.url;
//   breedDescription.textContent = storedBreeds[index].temperament;
// }

// fetchBreeds()
//   .then(() => {
//     populateBreedsSelect();
//     updateBreedInfo(0);
//     document.querySelector('.breed-select').addEventListener('change', (event) => {
//       updateBreedInfo(event.target.value);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//     document.querySelector('.error').textContent = "ШАЙГУ, ГЕРАСИМОВ! ГДЕ ***** БАЕПРИПАСЫ?!";
//   });

function updateBreedInfo(index) {
  const breedImage = document.getElementById('breed_image');
  const breedDescription = document.getElementById('breed_json');
  const wikiLink = document.getElementById('wiki_link');

  document.querySelector('.loader').textContent = 'Грузим, грузим загружаем';
  breedImage.onload = () => {
    document.querySelector('.loader').textContent = '';
  };

  breedImage.src = storedBreeds[index].image.url;
  breedDescription.textContent = storedBreeds[index].temperament;
}

fetchBreeds()
  .then(() => {
    populateBreedsSelect();
    updateBreedInfo(0); // Show the first breed by default

    // Add event listener to update breed info when selection changes
    document.querySelector('.breed-select').addEventListener('change', (event) => {
      updateBreedInfo(event.target.value);
    });
  })
  .catch((error) => {
    console.log(error);
    document.querySelector('.error').textContent = "ШАЙГУ, ГЕРАСИМОВ! ГДЕ ***** БАЕПРИПАСЫ?!";
  });


const errorText = document.querySelector('.error').textContent = ""