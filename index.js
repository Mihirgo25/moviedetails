const apiKey = "61a2bc53";
var prevpageno = 0;
var nextpageno = 0;
var currpageno = 0;
let usermovielist = new Map();

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
    usermovielist.set(value, review);
    const movieDetailsElement = document.getElementById('moviedet');
    movieDetailsElement.innerHTML += `<p>User Review: ${userreviews.get(value)}</p>`
}

function searchMovies() {
    var queryInp = document.getElementById('titlefield');
    var pageInp = document.getElementById('pagefield');
    var query = queryInp.value;
    var page = pageInp.value;
    currpageno = parseInt(page);
    prevpageno = currpageno - 1;
    nextpageno = currpageno + 1;
    if (query !== '') {
        if(page == ''){
            page = "1";
        }
        
    }
    else{
        query = "One Piece";
    }
    fetchMovies(query, page);
}

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
    const movieDetailsElement = document.getElementById('moviedet');
    movieDetailsElement.innerHTML = '';
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

function gotoprev(){
    var queryInp = document.getElementById('titlefield');
    var query = queryInp.value;
    if(prevpageno != 0){
        currpageno--;
        prevpageno--;
        nextpageno--;
    }
    if (query == '') {
        query = "One Piece";
    }
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${currpageno}`;

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

function gotonext(){
    var queryInp = document.getElementById('titlefield');
    var query = queryInp.value;
    currpageno++;
    nextpageno++;
    prevpageno++;

    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${currpageno}`;
    if (query == '') {
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=One_Piece&page=${currpageno}`;
    }
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