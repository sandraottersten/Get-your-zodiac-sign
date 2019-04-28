var picker = flatpickr("#dateInput", {});


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
  var myDate = document.getElementById('dateInput').value;
  var noYear = myDate.slice(5, 10);
  var date = noYear.replace('-', '/')
  console.log(date)
  myDate.value = "";

  console.log(myDate)

  var requestData = new FormData()
  requestData.append("action", "addHoroscope")
  requestData.append("inputDate", date)

  makeRequest("addHoroscope.php", "POST", requestData, (response)=>{
    console.log(response)
  })
}

function updateHoroscope() {
  var myDate = document.getElementById('dateInput').value;
  var noYear = myDate.slice(5, 10);
  var date = noYear.replace('-', '/')
  console.log(date)
  myDate.value = "";

  console.log(myDate)

  var requestData = new FormData()
  requestData.append("inputDate", date)

  makeRequest("updateHoroscope.php", "POST", requestData, (response)=>{
    console.log(response)
  })
console.log('update')

}

function deleteHoroscope() {
  var requestData = new FormData()
  makeRequest("deleteHoroscope.php", "DELETE", requestData, (response)=>{
    console.log(response)
  })

console.log('delete')
}

function viewHoroscope() {
  var requestData = new FormData()
  makeRequest("viewHoroscope.php", "GET", requestData, (response)=>{
    console.log(response)
  })
console.log('view')
}
