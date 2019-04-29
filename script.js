window.onload = viewHoroscope();

// kollar om metoden är GET, då skickas ej en body med

function makeRequest(url, method, requestData, callback) {
  var headers;
  if (method == "GET") {
    headers = {
      method: method
    }
  } else {
    headers = {
      method: method,
      body: requestData
    }
  }

// gör en request via fetch

  fetch(url, headers).then((data) => {
    return data.json()
  }).then((result) => {
    callback(result)
  }).catch((err) => {
    console.log(err)
  })
}

// tar datuminputen och gör om den till samma format som i databasen
// visar/döljer knappar
// skickar med datuminputen till requesten
// uppdaterar outputen med viewHoroscope

function addHoroscope() {
  var myDate = document.getElementById('dateinput').value;
  var noYear = myDate.slice(5, 10);
  var date = noYear.replace('-', '/')
  myDate.value = "";

  document.getElementById("add").style.display = 'none';
  document.getElementById("update").style.display = 'unset';
  document.getElementById("delete").style.display = 'unset';

  var requestData = new FormData()
  requestData.append("inputDate", date)

  makeRequest("addHoroscope.php", "POST", requestData, (response) => {
    viewHoroscope();
    console.log(response)
  })
}

// tar datuminputen och gör om den till samma format som i databasen
// skickar med datuminputen till requesten
// uppdaterar outputen med viewHoroscope

function updateHoroscope() {
  var myDate = document.getElementById('dateinput').value;
  var noYear = myDate.slice(5, 10);
  var date = noYear.replace('-', '/')
  myDate.value = "";

  var requestData = new FormData()
  requestData.append("inputDate", date)

  makeRequest("updateHoroscope.php", "POST", requestData, (response) => {
    viewHoroscope();
    console.log(response)
  })
}

// visar/döljer knappar
// skickar en request, om delete lyckades uppdateras text och bild

function deleteHoroscope() {

  document.getElementById("add").style.display = 'unset';
  document.getElementById("update").style.display = 'none';
  document.getElementById("delete").style.display = 'none';

  var requestData = new FormData()
  makeRequest("deleteHoroscope.php", "DELETE", requestData, (response) => {
    if (response == true) {
      setText('Who are you?')
      var myDate = document.getElementById('dateinput').value = "";
      document.getElementById("image").remove();
      setImage('none');
      console.log(response)
    } else {
      console.log(response)
    }
  })
}

// skickar en request och uppdaterar bild, text och knappar beroende på respons

function viewHoroscope() {
  var requestData = new FormData()
  makeRequest("viewHoroscope.php", "GET", requestData, (response) => {

    if (document.getElementById("image")) {
      document.getElementById("image").remove();
    }
    if (!response) {
      setImage('none');
      setText('Who are you?')
      document.getElementById("add").style.display = 'unset';
      document.getElementById("update").style.display = 'none';
      document.getElementById("delete").style.display = 'none';
    } else {
      setText(response)
      setImage(response)
      document.getElementById("add").style.display = 'none';
      document.getElementById("update").style.display = 'unset';
      document.getElementById("delete").style.display = 'unset';
    }
  })
}

// skapar en image tag med korrekt bild

function setImage(name) {
  var container = document.getElementById('picture')
  var image = document.createElement('img')
  image.id = "image"
  image.src = `img/${name}.png`
  container.appendChild(image);
}

// skriver ut rätt horoskop

function setText(text) {
  var result = document.getElementById('horoscope')
  result.innerText = text
}
