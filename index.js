const apiKey = "61a2bc53";
let usermovielist = {};
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
    movieListElement.innerHTML = '<div id = "movieprev"></div><div id = "movienext"></div>';
    const movieDetailsElement = document.getElementById('moviedet');
    movieDetailsElement.innerHTML = '';
    const movieprevpage = document.getElementById('movieprev');
    movieprevpage.innerHTML = '<button onclick = "gotoprev()">Previous</button>';
    const movienextpage = document.getElementById('movienext');
    movienextpage.innerHTML = '<button onclick = "gotonext()">Next</button>';
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
    movieListElement.appendChild(movieprevpage);
    movieListElement.appendChild(movienextpage);

}

function searchMovies() {
    const queryInp = document.getElementById('titlefield');
    const pageInp = document.getElementById('pagefield');
    const query = queryInp.value;
    const page = pageInp.value;
    if (query !== '') {
        if(page == ''){
            page = "1";
        }
        fetchMovies(query, page);
    }
    else{
        fetchMovies("One Piece", "1");
    }
    queryInp.value = "";
    pageInp.value = "";
}

function searchMoviesID() {
    var query = document.getElementById('idfield').value;
    if (query !== '') {
        displayMovieDetails(query);
    }
    else{
        displayMovieDetails("tt11032374");
    }
    query = "";
}



function displayMovieDetails(movieID) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movieListElement = document.getElementById("main");
            movieListElement.innerHTML = '';

            const movieDetailsElement = document.getElementById('moviedet');
            movieDetailsElement.innerHTML = `
            <h3>${data.Title} <br><br><br> ID: ${data.imdbID}</h3>
            <img src="${data.Poster}" alt="${data.Title}">
            <p><strong>Plot:</strong><br>${data.Plot}</p>
            <p><strong>Cast:</strong> ${data.Actors}</p>
            <p><i class="fa-solid fa-star" style="color: #f2de02;"></i><strong>Rating:</strong> ${data.imdbRating}</p>
            <p><strong>Release Date:</strong> ${data.Released}</p>
            <p class = "empty"></p>
            <p><input id = "reviewInp" type = "text" placeholder = "Give Review"><button onclick = "addreview(${data.imdbID})">Add Review</button></p>
        `;
        })
        .catch(err => {
            console.error('Error fetching movie details from OMDB API:', err);
        });

}

function addreview(value){
    const reviewInput = document.getElementById('reviewInp');
    const review = reviewInput.value();

    if(userreviews[value] == null){
        userreviews[value] = review; 
    }
    else{
        const movieDetailsElement = document.getElementById('moviedet');
        movieDetailsElement.innerHTML += `<p>User Review: ${userreviews[value]}</p>`
    }

}