window.onload = viewHoroscope();


// var picker = flatpickr("#dateinput", {});


function makeRequest(url, method, requestData, callback) {
  var headers;
  if(method == "GET") {
    headers = {
      method: method
    }
  } else {
    headers = {
      method: method,
      body: requestData
    }
  }

  fetch(url, headers).then((data) => {
    return data.json()
  }).then((result) => {
    callback(result)
  }).catch((err) => {
    console.log(err)
  })
}

function addHoroscope() {
  var myDate = document.getElementById('dateinput').value;
  var noYear = myDate.slice(5, 10);
  var date = noYear.replace('-', '/')
  myDate.value = "";

  var requestData = new FormData()
  requestData.append("action", "addHoroscope")
  requestData.append("inputDate", date)

  makeRequest("addHoroscope.php", "POST", requestData, (response)=>{
    viewHoroscope();
    console.log(response)
  })
}

function updateHoroscope() {
  var myDate = document.getElementById('dateinput').value;
  var noYear = myDate.slice(5, 10);
  var date = noYear.replace('-', '/')
  myDate.value = "";

  var requestData = new FormData()
  requestData.append("inputDate", date)

  makeRequest("updateHoroscope.php", "POST", requestData, (response)=>{
    viewHoroscope();
    console.log(response)
  })
}

function deleteHoroscope() {
  var requestData = new FormData()
  makeRequest("deleteHoroscope.php", "DELETE", requestData, (response)=>{
    if(response == true) {
      var result = document.getElementById('horoscope')
      result.innerText = "Who are you?"

      var myDate = document.getElementById('dateinput').value = "";


      document.getElementById("image").remove();
      var container = document.getElementById('picture')
      var image = document.createElement('img')
      image.id = "image"
      image.src = `img/none.png`
      container.appendChild(image);
      console.log(response)
    } else {
      console.log(response)
    }
  })
}

function viewHoroscope() {
  var requestData = new FormData()
  makeRequest("viewHoroscope.php", "GET", requestData, (response)=>{


    if(document.getElementById("image")){
      document.getElementById("image").remove();
    }
    console.log(response)
    if(!response) {
      var container = document.getElementById('picture')
      var image = document.createElement('img')
      image.id = "image"
      image.src = `img/none.png`
      container.appendChild(image);

      var result = document.getElementById('horoscope')
      result.innerText = "Who are you?"
    } else {
      var result = document.getElementById('horoscope')
      result.innerText = response
      
      var container = document.getElementById('picture')
      var image = document.createElement('img')
      image.id = "image"
      image.src = `img/${response}.png`
      container.appendChild(image);
    }

  })
}
