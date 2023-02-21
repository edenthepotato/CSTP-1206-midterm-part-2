const apiKey = '6ac048959da4bc253469d3fd31603bf4';
const searchInput = document.getElementById('search-input');
const movieGrid = document.getElementById('movie-grid');

// Retrieve movie data from TMDB API
async function fetchMovies(query) {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
  const data = await response.json();
  return data.results;
}

// Create HTML element for a single movie
function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');
  
  const imageElement = document.createElement('img');
  imageElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  const detailsElement = document.createElement('div');
  detailsElement.classList.add('movie-details');
  
  const titleElement = document.createElement('h2');
  titleElement.classList.add('movie-title');
  titleElement.innerText = movie.title;

  const releaseYearElement = document.createElement('p');
  releaseYearElement.classList.add('movie-release-year');
  releaseYearElement.innerText = movie.release_date.slice(0, 4);
  
  const genreElement = document.createElement('p');
  genreElement.classList.add('movie-genre');
  genreElement.innerText = movie.genre_ids.join(', ');
  
  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('movie-description');
  descriptionElement.innerText = movie.overview;
  
  detailsElement.appendChild(titleElement);
  detailsElement.appendChild(releaseYearElement);
  detailsElement.appendChild(genreElement);
  detailsElement.appendChild(descriptionElement);
  
  movieElement.appendChild(imageElement);
  movieElement.appendChild(detailsElement);
  
  return movieElement;
}

// Populate the movie grid with movies
function displayMovies(movies) {
  movieGrid.innerHTML = '';
  if (movies.length === 0) {
    const noResultsElement = document.createElement('p');
    noResultsElement.innerText = 'No results found.';
    movieGrid.appendChild(noResultsElement);
  } else {
    movies.forEach(movie => {
      movieGrid.appendChild(createMovieElement(movie));
    });
  }
}

// Handle search input changes
searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  if (query.length > 0) {
    const movies = await fetchMovies(query);
    displayMovies(movies);
  } else {
    movieGrid.innerHTML = '';
  }
});

