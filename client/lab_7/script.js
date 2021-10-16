async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint)
  const resturaunts = await request.json()

  function findMatches(wordToMatch, resturaunts) {
    return resturaunts.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    layerGroup.clearLayers()
    console.log(event.target.value);
    console.log(event.target.value.length);
    if (event.target.value.length != 0) {
      const matchArray = findMatches(event.target.value, resturaunts).slice(0,5);
      mymap.setView(matchArray[0].geocoded_column_1.coordinates.reverse(),10)
      console.log("set view");
      console.log(matchArray[0].geocoded_column_1.coordinates.reverse(),10);
      const html = matchArray.map((place) => `
      <div class='row pt-1'>
      <div class='box has-text-black has-background-white'>
        <b>${place.name} </b><br> 
        <i>${place.address_line_1}, <br> </i>
        <i>${place.zip} </i> <br>
      </div>
      </div>
    `
    ).join('');
      suggestions.innerHTML = html;
      for(let i = 0; i < matchArray.length; i++){
        var marker = L.marker(matchArray[i].geocoded_column_1.coordinates.reverse()).addTo(layerGroup);
        console.log(i);
        console.log(matchArray[i].geocoded_column_1.coordinates.reverse());
      }
      console.log(matchArray);
    } else {
      suggestions.innerHTML = '';
      mymap.setView([38.986001, -76.944837], 8);
    }
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });

  //Initialize Map
  var mymap = L.map('mapid').setView([38.986001, -76.944837], 8);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF4dGVycjEyIiwiYSI6ImNrdXU0cTBvOTN6bHkyb29mYWl3NGk3cGUifQ.7djIIPHLskh_BCu_umUWbw', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWF4dGVycjEyIiwiYSI6ImNrdXU0cTBvOTN6bHkyb29mYWl3NGk3cGUifQ.7djIIPHLskh_BCu_umUWbw'
  }).addTo(mymap);
  var layerGroup = L.layerGroup().addTo(mymap);



}
  
window.onload = windowActions


