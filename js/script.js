var jwt = ''

$(document).ready(function () {
  $.ajax({
    url: 'https://gestionweb.frlp.utn.edu.ar/api/auth/local',
    method: 'POST',
    dataType: 'json',
    data: {
      identifier: 'api-user@example.com',
      password: '123456'
    },
    success: function (response) {
      jwt = response.jwt
      console.log(jwt)
    },
    error: function (error) {
      console.log(error);
    }
  });
});

var movieData;

function show() {
    if (document.getElementById('movieApi').style.display == "block") {
        document.getElementById('movieApi').style.display = "none";
    }
    else {
        document.getElementById('movieApi').style.display = "block";
        document.getElementById('movie-list').style.display = "none";
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
  movieData = {                                                     //agregue yo
    "Title": document.getElementById('movie-title').innerHTML,
    "Poster": document.getElementById('movie-poster').src
  };
}


document.getElementById('rating-1').value='1';
document.getElementById('rating-2').value='2';
document.getElementById('rating-3').value='3';
document.getElementById('rating-4').value='4';
document.getElementById('rating-5').value='5';


//Rate para las películas

var movieData;
var movieRatings = {};

var stars = document.querySelectorAll(".stars i");
function getID() {
    var btnID = event.target.id;
}
stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
      /*
      $.ajax({
        url: 'https://gestionweb.frlp.utn.edu.ar/api/g15-peliculas',
        type: 'POST',
        dataType: 'json',             //yo
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}` //aca habia un error
        },
        data: JSON.stringify({
          "data": {
            "Title": movieData.Title,        //Modifique yo
            "Poster": movieData.Poster,
            "Rating": star.id
        }}),
        
    });
    */
    });
  });
});

function addRating() {
  var activeStar = document.querySelector(".stars .active");
  if (activeStar) {
    var ratingValue = activeStar.id.split("-")[1];
    var movieTitle = document.getElementById('movie-title').innerHTML;
    var moviePoster = document.getElementById('movie-poster').src;
  
    if (movieRatings[movieTitle] && movieRatings[movieTitle].deleted) {
      delete movieRatings[movieTitle].deleted;
    }  
    else if (movieRatings[movieTitle]) {
      console.log("Esta película ya ha sido puntuada. No se puede puntuar nuevamente.");
      Swal.fire({
        title: 'Esta pelicula ya se puntúo',
        icon: 'error',
      });
      return;
    }  
    else{
      movieRatings[movieTitle] = {
        "Title": movieTitle,
        "Poster": moviePoster,
        "Rating": ratingValue,
      };
      $.ajax({
        url: 'https://gestionweb.frlp.utn.edu.ar/api/g15-peliculas',
        type: 'POST',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        data: JSON.stringify({
          "data": {
            "Title": movieTitle, //.
            "Poster": moviePoster,
            "Rating": ratingValue
          }
        }),
        success: function (response) {
          console.log(response);
          Swal.fire({
            title: 'Se puntuó correctamente',
            icon: 'success',
          });
        },
        error: function (error) {
          console.log(error);
          Swal.fire({
            title: 'Error al puntuar',
            text: 'Ocurrió un error al guardar la puntuación.',
            icon: 'error',
          });
        }
      });
        
    }
  } else {
    console.log("Por favor, seleccione un valor de rating antes de guardar.");
  }
};

function rateFuncion() {
  if (document.getElementById('movie-list').style.display == "block") {
    document.getElementById('movie-list').style.display = "none";
  }
  else {
    document.getElementById('movie-list').style.display = "block";
    document.getElementById('movieApi').style.display = "none";
}
  getPuntuaciones();
}

function getPuntuaciones() {
  $.ajax({
    url: 'https://gestionweb.frlp.utn.edu.ar/api/g15-peliculas',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    success: function (response) {
      console.log(response);
  
      if (Array.isArray(response.data)) {
        var movieList = document.getElementById('movie-list');
        movieList.innerHTML = '';
  
        response.data.forEach(function (movie) {
          var listItem = document.createElement('div');
          listItem.setAttribute("class", "movie-item");
  
          var movieTitle = movie.attributes.Title;
          // Verificar si la película está eliminada
          if (movieRatings[movieTitle] && movieRatings[movieTitle].deleted) {
            return; // Si está eliminada, saltar a la siguiente iteración
          }
  
          listItem.innerHTML = `
              <div class="movie-poster-rating"><img src="${movie.attributes.Poster}" alt="Movie Poster"></div>
              <div class="movie-title-rating">${movie.attributes.Title}</div>
              <div class="movie-rating-rating">${movie.attributes.Rating}</div>
              <button class="btn btn-primary" onclick="eliminarPeliculaPuntuada('${movie.id}')">Eliminar</button>
          `;
          movieList.appendChild(listItem);
        });
      } else {
        console.log('La respuesta de la API no contiene datos válidos o está vacía.');
      }
    },
    error: function (error) {
      console.log(error);
      Swal.fire({
        title: 'Error al obtener puntuaciones',
        text: 'Ocurrió un error al obtener las puntuaciones.',
        icon: 'error',
      });
    }
  });
};


function eliminarPeliculaPuntuada(movieID) {
  $.ajax({
    url: `https://gestionweb.frlp.utn.edu.ar/api/g15-peliculas/${movieID}`,
    type: 'DELETE',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    success: function (response) {
      console.log(response);
      var movieTitle = response.data.attributes.Title;
      if (movieRatings[movieTitle]) {
        movieRatings[movieTitle].deleted = true;
      }
      getPuntuaciones();
    },
    error: function (error) {
      console.log(error);
    }
  });
}




















