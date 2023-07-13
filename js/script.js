function show() {
    if (document.getElementById('movieApi').style.display == "block") {
        document.getElementById('movieApi').style.display = "none";
    }
    else {
        document.getElementById('movieApi').style.display = "block";
    }
}

function searchMovie() {
    var searchQuery = document.getElementById('searchInput').value;
    const apiUrl = `http://www.omdbapi.com/?apikey=2d435d7a&t=${encodeURIComponent(searchQuery)}`;
    $.ajax({
        url: apiUrl,
        success: function(data) {
            if (data.Response === "True") {
                document.getElementById('movie-title').innerHTML = data.Title;
                document.getElementById('movie-year').innerHTML = data.Year;
                document.getElementById('movie-genre').innerHTML = data.Genre;
                document.getElementById('movie-direc').innerHTML = data.Director;
                document.getElementById('movie-actors').innerHTML = data.Actors;
                document.getElementById('movie-plot').innerHTML = data.Plot;
                document.getElementById('movie-poster').src = data.Poster;
                document.getElementById('rate-movie').style.display = "block";
            } else {
                document.getElementById('movieDetails').innerHTML = 'No se encontró ninguna película con ese título.';
                document.getElementById('rate-movie').style.display = "none";
            }
        },
        error: function() {
            document.getElementById('movieDetails').innerHTML = 'Ocurrió un error al realizar la búsqueda.';
            document.getElementById('rate-movie').style.display = "none";
        }
    });
}

