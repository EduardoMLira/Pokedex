const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
maxRecord = 18
const limit = 6
let offset = 0;

const pokemonImages = {'bulbasaur':'https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif', 'ivysaur':'https://img.pokemondb.net/sprites/black-white/anim/normal/ivysaur.gif',
'venusaur':'https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur.gif', 'charmander':'https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif', 
'charmeleon':'https://img.pokemondb.net/sprites/black-white/anim/normal/charmeleon.gif', 'charizard':'https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif',
'squirtle':'https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif', 'wartortle':'https://img.pokemondb.net/sprites/black-white/anim/normal/wartortle.gif',
'blastoise':'https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif', 'caterpie':'https://img.pokemondb.net/sprites/black-white/anim/normal/caterpie.gif',
'metapod':'https://img.pokemondb.net/sprites/black-white/anim/normal/metapod.gif', 'butterfree':'https://img.pokemondb.net/sprites/black-white/anim/normal/butterfree.gif', 'weedle': 
'https://img.pokemondb.net/sprites/black-white/anim/normal/weedle.gif', 'kakuna': 'https://img.pokemondb.net/sprites/black-white/anim/normal/kakuna.gif', 
'beedrill': 'https://img.pokemondb.net/sprites/black-white/anim/normal/beedrill.gif','pidgey': 'https://img.pokemondb.net/sprites/black-white/anim/normal/pidgey.gif', 
'pidgeotto': 'https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeotto.gif', 'pidgeot': 'https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeot.gif'}

function convertPokemonToLi(pokemon) {
    const imageUrl = pokemonImages[pokemon.name.toLowerCase()]
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <span class="pokemonInfo">${JSON.stringify(pokemon)}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) =>  `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${imageUrl}" width="100px" height="100px" 
                    alt="${pokemon.name}">
            </div>
        </li>
        `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit
    
    if (qtdRecordsWithNextPage >= maxRecord) {
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)
    
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

pokemonList.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    
    if (clickedPokemon) {
      const pokemonName = clickedPokemon.querySelector(".name").textContent;
      const pokemonInfo = clickedPokemon.querySelector(".pokemonInfo").textContent;
      const pokemonInfoParsed = JSON.parse(pokemonInfo);
      localStorage.setItem("pokemonInfo", JSON.stringify(pokemonInfoParsed));

      window.location.href = `pokemon-specifications.html?pokemon=${pokemonName}`;
    }
});
