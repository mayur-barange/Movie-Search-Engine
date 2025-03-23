// // // const url = (`https://api.tvmaze.com/singlesearch/shows?q=${query}`);
const search = document.querySelector(".search-bar");
let newImg = document.querySelectorAll(".i");

search.addEventListener("keypress",(e)=>{
  if(e.key == "Enter"){
  let query = document.querySelector("input").value.toLowerCase();
  getData(query);
  }
});

const getData = async (query) => {
  let result = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  let data = await result.json();
  getImg(data);
};


const getImg = (data) => {
  const newImg = document.querySelector(".movie-img");

  newImg.innerHTML = ""; 

  if (data.length === 0) {
    const notFoundMsg = document.createElement("div");
    notFoundMsg.innerText = "Movie not found";
    notFoundMsg.classList.add("not-found");
    newImg.appendChild(notFoundMsg);
    return; 
  }

  const createMovieElement = (movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const img = document.createElement("img");
    img.src = movie.show.image ? movie.show.image.medium : "default-image.jpg";
    img.classList.add("movie-img-element");
    movieContainer.appendChild(img);

    const movieTitle = document.createElement("div");
    movieTitle.innerHTML = `<span class="red-text">|</span> Title: ${movie.show.name}`;
    movieTitle.classList.add("movie-title");
    movieContainer.appendChild(movieTitle);
    
    

    const genres = document.createElement("div");
    genres.innerText = `Genres: ${movie.show.genres.join(", ") || "N/A"}`;
    genres.classList.add("movie-genres");
    movieContainer.appendChild(genres);

    const rating = document.createElement("div");
    rating.innerText = `Rating: ${movie.show.rating.average || "N/A"}`;
    rating.classList.add("movie-rating");
    movieContainer.appendChild(rating);

    return movieContainer;
  };

  data.forEach((movie) => {
    if (movie.show.image && movie.show.name) {
      const movieElement = createMovieElement(movie);
      newImg.appendChild(movieElement);
    }
  });


};












