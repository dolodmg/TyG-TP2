function show() {
    if (document.getElementById('movieApi').style.display == "block") {
        document.getElementById('movieApi').style.display = "none";
    }
    else {
        document.getElementById('movieApi').style.display = "block";
    }
}

function searchMovie() {
    stars.forEach(star => star.classList.remove("active")); //Se reinicia el puntaje de la película, en caso de haber puntuado otra antes.
    var searchQuery = document.getElementById('searchInput').value;
    const apiUrl = `http://www.omdbapi.com/?apikey=2d435d7a&t=${searchQuery}`;
    $.ajax({
        url: apiUrl,
        success: function(data) { 
            if (data.Response === "True") { //Si el texto ingresado en el input coincide con una película de la API
                document.getElementById('no-result').style.display = "none";
                document.getElementById('all-movie').style.display = "block";
                document.getElementById('movie-title').innerHTML = data.Title;
                document.getElementById('movie-year').innerHTML = data.Year + ' | ' + data.Genre ;
                document.getElementById('movie-director').innerHTML =  'Director: ' + data.Director;
                document.getElementById('movie-actors').innerHTML = 'Cast: ' + data.Actors;
                document.getElementById('movie-plot').innerHTML = data.Plot;
                document.getElementById('movie-poster').src = data.Poster;     
            }
            else if (searchQuery === '') { //Si se ingresó un input vacío
                document.getElementById('all-movie').style.display = "none";
                document.getElementById('no-result').style.display = "block";
            }
        },
        error: function() { //Si hubo otro error
            document.getElementById('allMovie').innerHTML = 'Ocurrió un error al realizar la búsqueda.';
    }
  });
}

//Rate para las películas
var stars = document.querySelectorAll(".stars i");
function getID() {
    var btnID = event.target.id;
}
stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
      $.ajax({
        url: 'https://gestionweb.frlp.utn.edu.ar/api/g15-pelicula',
        type: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        data: JSON.stringify({
          "data": {
            "Title": data.Title,
            "Poster": data.Poster,
            "Rating": star.target.id.value
        })
    });
    });
  });
});

document.getElementById('rating-1').value='1';
document.getElementById('rating-2').value='2';
document.getElementById('rating-3').value='3';
document.getElementById('rating-4').value='4';
document.getElementById('rating-5').value='5';

function addRating() {
    $.ajax({
        url: 'https://gestionweb.frlp.utn.edu.ar/api/g15-pelicula',
        type: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        data: JSON.stringify({
          "data": {
            "Title": data.Title,
            "Poster": data.Poster,
            "Rating": 
        })
    });
};


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