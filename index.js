const apiKey = "61a2bc53";
let movies = [];
function fetchMovies(query, page) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                console.log(data)
                totalResults = parseInt(data.totalResults);
                displayMovies(data.Search);
            } else {
                console.log('No results found.');
            }
        })
        .catch(err => {
            console.error('Error fetching data from OMDB API:', err);
        });
}


function displayMovies(movies) {
    const movieListElement = document.getElementById("main");
    movieListElement.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
        <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title}">
        <h2>${movie.Title}</h2>
        `;
        movieItem.addEventListener('click', function () {
            currentMovieID = movie.imdbID;
            console.log(currentMovieID)
            displayMovieDetails(currentMovieID);
        });
        movieListElement.appendChild(movieItem);
    });
}

function searchMovies() {
    const queryInp = document.getElementById('titlefield');
    const pageInp = document.getElementById('pagefield');
    const query = queryInp.value;
    const page = pageInp.value;
    if (query !== '') {
        fetchMovies(query, page);
    }
    queryInp.value = "";
    pageInp.value = "";
}

function searchMoviesID() {
    const query = document.getElementById('idfield').value;
    if (query !== '') {
        displayMovieDetails(query);
    }
    query = "";
}



function displayMovieDetails(movieID) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movieDetailsElement = document.getElementById('main');
            movieDetailsElement.innerHTML = `
            <h2>${data.Title}</h2>
            <img src="${data.Poster}" alt="${data.Title}">
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>Cast:</strong> ${data.Actors}</p>
            <p><strong>Release Date:</strong> ${data.Released}</p>
            <p><strong>Rating:</strong> ${data.imdbRating}</p>
        `;
        })
        .catch(err => {
            console.error('Error fetching movie details from OMDB API:', err);
        });

}