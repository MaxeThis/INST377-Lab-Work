async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint)
  const resturaunts = await request.json()

  function findMatches(wordToMatch, resturaunts) {
    return resturaunts.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.category.match(regex);
    });
  }

  function displayMatches(event) {
    console.log(event.target.value);
    console.log(event.target.value.length);
    if (event.target.value.length != 0) {
      const matchArray = findMatches(event.target.value, resturaunts);
      const html = matchArray.map((place) => `
      <li>
        ${place.name}, <br> 
        ${place.category} <br> 
        <i>${place.address_line_1} <br> 
        ${place.zip}</i>
      </li>
    `).join('');
      suggestions.innerHTML = html;
    } else {
      suggestions.innerHTML = '';
    }
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}

window.onload = windowActions