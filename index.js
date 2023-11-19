const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage() {
  const inputValue = document.getElementById("input").value;

  if (inputValue < 1 || inputValue > 10) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerHTML = "Number should be between 0 and 11";
    return;
  }

  imgs = "";

  try {
    btnEl.style.display = "none";
    const loading = `<img src = 'spin.svg'>`;
    galleryEl.innerHTML = loading;
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=8tcNZ15JbJftWGXsaFbu7NvU5I1B9tBUERCYI7dT9h8`
    ).then((response) => {
      response.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            imgs += `
            <img src=${pic.urls.small} alt="image"/>
            `;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = imgs;
            btnEl.style.display = "block";
            errorMessageEl.style.display = "none";
          });
        }
      });
    });
  } catch (error) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerHTML = "An error is happening, try again later";
    btnEl.style.display = "block";
  }
}

btnEl.addEventListener("click", fetchImage);
