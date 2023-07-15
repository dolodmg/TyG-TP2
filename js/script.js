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
    const apiUrl = `http://www.omdbapi.com/?apikey=2d435d7a&t=${searchQuery}`;
    $.ajax({
        url: apiUrl,
        success: function(data) {
            if (data.Response === "True") {
                document.getElementById('no-result').style.display = "none";
                document.getElementById('all-movie').style.display = "block";
                document.getElementById('movie-title').innerHTML = data.Title;
                document.getElementById('movie-year').innerHTML = data.Year + ' | ' + data.Genre ;
                document.getElementById('movie-director').innerHTML =  'Director: ' + data.Director;
                document.getElementById('movie-actors').innerHTML = 'Cast: ' + data.Actors;
                document.getElementById('movie-plot').innerHTML = data.Plot;
                document.getElementById('movie-poster').src = data.Poster;
                // verifica que la pelicula no tenga puntuacion
                var movieTitle = data.Title; //NO me funciona la restricción amor :( me deja poner mil puntajes
                if (!movieRatings[movieTitle]) {
                    movieRatings[movieTitle] = [];
                }
                else if (movieRatings[movieTitle]) {
                    alert("Ya existe puntaje para la película");
                }
            }
            else if (searchQuery === '') {
                document.getElementById('all-movie').style.display = "none";
                document.getElementById('no-result').style.display = "block";
            }
        },
        error: function() {
            document.getElementById('allMovie').innerHTML = 'Ocurrió un error al realizar la búsqueda.';
    }
  });
}

//Funcion para dar puntaje a una pelicula
function rateMovie() {
    var puntuacion = prompt("Ingresa una puntuación del 1 al 5:");
    if (puntuacion >= 1 && puntuacion <= 5) {
        var movieTitle = document.getElementById('movie-title').innerHTML; 
        movieRatings[movieTitle] = puntuacion;
        alert("Puntuación válida:" + puntuacion);
    } else {
        alert("Puntuación inválida. Por favor, ingresa un número del 1 al 5.");
    }
}


//Proximo objetivo ver los puntajes al apretar ver puntaje!
/*
function showPeliculasPuntuadas() {
    if (document.getElementById('a').style.display == "block") {
        document.getElementById('a').style.display = "none";
    }
    else {
        document.getElementById('a').style.display = "block";
    }
}
*/