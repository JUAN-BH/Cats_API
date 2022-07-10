//*ADD CATS
const numCats = document.querySelector(".input--cats");
const addCatsBtn = document.querySelector(".btn--addCats");
//*UPLOAD CATS
const inputImage = document.querySelector("#inputImage");
const upload__imgsContainer = document.querySelector(".upload__imgsContainer");
const uploadbtnCat = document.querySelector(".upload--btnCat");
const modalRes = document.querySelector(".modalRes");
const modalBtn = document.querySelector(".modal--btn");
//*RAMDOM CATS CONTAINER
const imagesContainer = document.querySelector(
  ".randomImagesContainer__imagesContainer"
);
//*FAVORITE CATS CONTAINER
const favoritesContainer = document.querySelector(".favorites__imgsContainer");
//*URL APIs
const API_FAVORITE = `https://api.thecatapi.com/v1/favourites`;
const API_FAVORITE_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}`;
const API_UPLOAD = `https://api.thecatapi.com/v1/images/upload`;

async function fetchData(urlApi) {
  try {
    const response = await fetch(urlApi);
    const data = await response.json();
    console.log("la data de la api", data);
    let imagesView = data
      .map((e) => {
        return `
      <div class="container__Img">
      <img src="${e.url}" alt="Random cats" id="${e.id}" />
      </div>
      `;
      })
      .join("");
    imagesContainer.innerHTML = imagesView;
  } catch (error) {
    console.log(error);
  }
  var imagesItems = document.querySelectorAll(".container__Img");
  imagesItems.forEach((e) => {
    e.addEventListener("dblclick", (item) => {
      console.log(item.target);
      /*let containerImages = Array.from(favoritesContainer.children).map(
        (e) => e.id
      );
      if (containerImages.includes(item.target.id)) {
        favoritesContainer.removeChild(
          favoritesContainer.children[item.target.id]
        );
        console.log("container image", item.target.nextSibling.nextSibling);
        item.target.nextSibling.parentNode.removeChild(
          item.target.nextSibling.nextSibling
        );
      } else {
        const favoriteImgView = `
        <div class="container__ImgFavorite" id="${item.target.id}">
        <img src="${item.target.src}" alt="Favorite cats" id="${item.target.id}" />
        </div>
        `;
        favoritesContainer.innerHTML += favoriteImgView;
      }*/
      item.target.nextSibling.parentNode.innerHTML += `<span class="Animated_heart"> </span>`;
      addFavoritesCat(API_FAVORITE, item.target.id);
    });
    let doubletap = false;
    e.addEventListener("touchstart", (item) => {
      if (!doubletap) {
        doubletap = true;
        setTimeout(() => {
          doubletap = false;
        }, 300);
      } else {
        console.log("doubletap");
        item.target.nextSibling.parentNode.innerHTML += `<span class="Animated_heart"> </span>`;
        addFavoritesCat(API_FAVORITE, item.target.id);
        // console.log("e.target", e.children.item(1));
      }
    });
  });
}

async function getFavoritesCats(urlApi) {
  const response = await fetch(urlApi, {
    method: "GET",
    headers: {
      "X-API-KEY": "333ac102-97bb-4811-a48c-0164b1756041",
    },
  });
  const data = await response.json();
  console.log("data de favoritos", data);

  let imagesView = data
    .map((e) => {
      return `
      <div class="container__ImgFavorite" id="${e.id}">
      <img src="${e.image.url}" alt="Random cats" id="${e.id}" />
      <span class="heart" id="${e.id}"> </span>
      </div>
      `;
    })
    .join("");
  favoritesContainer.innerHTML = imagesView;

  var imagesItems = document.querySelectorAll(".container__ImgFavorite");
  imagesItems.forEach((e) => {
    e.addEventListener("dblclick", (item) => {
      console.log(item.target);
      console.log("item.target.id", item.target.id);
      deleteFavoriteCat(item.target.id);
      favoritesContainer.removeChild(item.target.parentNode);
    });
    let doubletap = false;
    e.addEventListener("touchstart", (item) => {
      if (!doubletap) {
        doubletap = true;
        setTimeout(() => {
          doubletap = false;
        }, 300);
      } else {
        console.log("doubletap");
        deleteFavoriteCat(item.target.id);
        favoritesContainer.removeChild(item.target.parentNode);
      }
    });
  });
}

async function addFavoritesCat(urlApi, id) {
  const res = await fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //Con esto le indicamos al backend que es un json
      "X-API-KEY": "333ac102-97bb-4811-a48c-0164b1756041",
    },
    body: JSON.stringify({
      //De JSON lo pasamos a un string para que cualquier lengauje de backend pueda leerlo
      image_id: `${id}`,
    }),
  });
  const data = await res.json();
  console.log("data de favoritos agregado", data);
  if (res.status == 200) {
    // alert("Favorito agregado");
  } else {
    alert(`Errror en agregar ${res.status}, ${data.message}`);
  }
  getFavoritesCats(API_FAVORITE);
}

async function deleteFavoriteCat(id) {
  const res = await fetch(API_FAVORITE_DELETE(id), {
    method: "DELETE",
    headers: {
      "X-API-KEY": "333ac102-97bb-4811-a48c-0164b1756041",
    },
  });
  const data = await res.json();
  console.log("data de DELETE", res);
  if (res.status == 200) {
    // alert("gato eliminado");
  } else {
    alert(`Errror en eliminar ${res.status}, ${data.message}`);
  }
}

async function uploadCatPhoto() {
  const form = document.querySelector("#uploadForm");
  const formData = new FormData(form);
  console.log("upload", formData.get("file"));
  const res = await fetch(API_UPLOAD, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data", no hay necesidad de decirle al backend es un formData por que lo detecta automaticamente mediante el body
      "X-API-KEY": "333ac102-97bb-4811-a48c-0164b1756041",
    },
    body: formData,
  });
  const data = await res.json();

  if (res.status == 200 || res.status == 201) {
    console.log("data de upload", data);
    addFavoritesCat(API_FAVORITE, data.id);
    modalRes.style.display = "flex";
    upload__imgsContainer.style.display = "none";
  } else {
    alert(`Errror en subir ${res.status}, ${data.message}`);
  }
}

getFavoritesCats(API_FAVORITE);

addCatsBtn.addEventListener("click", () => {
  const API = `https://api.thecatapi.com/v1/images/search?limit=${numCats.value}&api_key=333ac102-97bb-4811-a48c-0164b1756041`;
  fetchData(API);
});

inputImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      upload__imgsContainer.style.display = "block";
      upload__imgsContainer.innerHTML = `<img src="${e.target.result}" class="upload__image" alt="Uploaded image" />`;
    };
  }
});

uploadbtnCat.addEventListener("click", () => {
  uploadCatPhoto();
});

modalBtn.addEventListener("click", () => {
  modalRes.style.display = "none";
});
