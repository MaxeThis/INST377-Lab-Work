const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'

const resturaunts = [];


fetch(endpoint)
    .then(blob => blob.json())
    .then(data => resturaunts.push(...data));


function findMatches(wordToMatch, resturaunts) {
    return resturaunts.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex);
    });
}

function displayMatches(){
    console.log(this.value)
    console.log(this.value.length)
    if(this.value.length != 0){
    const matchArray = findMatches(this.value, resturaunts);
    const html = matchArray.map(place => {
        return `
      <li>
        ${place.name}, <br> 
        ${place.category} <br> 
        <i>${place.address_line_1} <br> 
        ${place.zip}</i>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
    }
    else{
        suggestions.innerHTML = '';
        return;
    }
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', displayMatches)