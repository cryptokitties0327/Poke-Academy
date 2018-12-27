// console.log(window.location)
const queryParams = window.location.search;
// console.log(queryParams)
const id = queryParams.substring(1);
// console.log(id);

const url = `https://pokeapi.co/api/v2/pokemon/${id}/`

fetch(url)
  .then(resp => resp.json())
  .then(json => {
    const html = `
    <h1>${json.id}: ${json.name}</h1>
    <p>Height: ${json.height} | Weight: ${json.weight}</p>
    `;
    console.log(json)
    const info = document.querySelector('#poke-info')
    info.innerHTML = html;
  })

  .catch(error => console.log(error));
