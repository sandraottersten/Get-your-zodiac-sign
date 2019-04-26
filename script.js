var picker = flatpickr("#dateInput", {});


function makeRequest(url, method, requestData, callback) {
  fetch(url, {
    method: method,
    body: requestData
  }).then((data) => {
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
  myDate.value = "";

  var requestData = new FormData()
  requestData.append("action", "updateHoroscope")
  requestData.append("inputDate", myDate)

  makeRequest("updateHoroscope.php", "POST", requestData, (response)=>{
    console.log(response)
  })
console.log('update')

}

function deleteHoroscope() {
  var requestData = new FormData()
  requestData.append("action", "deleteHoroscope")
  makeRequest("deleteHoroscope.php", "POST", requestData, (response)=>{
    console.log(response)
  })

console.log('delete')
}

function viewHoroscope() {

  var requestData = new FormData()
  requestData.append("action", "viewHoroscope")
  makeRequest("viewHoroscope.php", "GET", requestData, (response)=>{
    console.log(response)
  })
console.log('view')
}
