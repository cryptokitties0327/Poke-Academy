const url = 'https://pokeapi.co/api/v2/pokemon/'

fetch(url)
  .then(resp => resp.json())
  .then(json => {
    const pokemon = json.results.splice(0, 151);
    let html = "";
    pokemon.forEach((poke,index)=> {
      html += `
      <a href="poke-info.html?${index + 1}">
        <p>${index + 1}: ${poke.name}</p>
      </a>
     `;
    })
    const list = document.querySelector('#pokemon-list')
    list.innerHTML = html;
    console.log(html)
  })
  
  .catch(error => console.log(error));