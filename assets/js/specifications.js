const tabs = document.querySelectorAll('.tabButton');
const contentElements = document.querySelectorAll('.contentSpecifications');
const line = document.querySelector('.line');

const pokemonImages = {'bulbasaur':'https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif', 'ivysaur':'https://img.pokemondb.net/sprites/black-white/anim/normal/ivysaur.gif',
'venusaur':'https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur.gif', 'charmander':'https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif', 
'charmeleon':'https://img.pokemondb.net/sprites/black-white/anim/normal/charmeleon.gif', 'charizard':'https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif',
'squirtle':'https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif', 'wartortle':'https://img.pokemondb.net/sprites/black-white/anim/normal/wartortle.gif',
'blastoise':'https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif', 'caterpie':'https://img.pokemondb.net/sprites/black-white/anim/normal/caterpie.gif',
'metapod':'https://img.pokemondb.net/sprites/black-white/anim/normal/metapod.gif', 'butterfree':'https://img.pokemondb.net/sprites/black-white/anim/normal/butterfree.gif', 'weedle': 
'https://img.pokemondb.net/sprites/black-white/anim/normal/weedle.gif', 'kakuna': 'https://img.pokemondb.net/sprites/black-white/anim/normal/kakuna.gif', 
'beedrill': 'https://img.pokemondb.net/sprites/black-white/anim/normal/beedrill.gif','pidgey': 'https://img.pokemondb.net/sprites/black-white/anim/normal/pidgey.gif', 
'pidgeotto': 'https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeotto.gif', 'pidgeot': 'https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeot.gif'}


function getPokemonDetailsFromAPI(pokemonName){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => data);
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function loadPokemonDetails(pokemonName) {
    getPokemonDetailsFromAPI(pokemonName).then((pokemon) => {
        document.getElementById('species').textContent = pokemon.species.name;
        document.getElementById('type').textContent = pokemon.types.map(type => type.type.name).join(', ');
        document.getElementById('height').textContent = pokemon.height;
        document.getElementById('weight').textContent = pokemon.weight;
        document.getElementById('ability').textContent = pokemon.abilities[0].ability.name;
        document.getElementById('hp').textContent = pokemon.stats[0].base_stat;
        document.getElementById('attack').textContent = pokemon.stats[1].base_stat;
        document.getElementById('defense').textContent = pokemon.stats[2].base_stat;
        document.getElementById('special-attack').textContent = pokemon.stats[3].base_stat;
        document.getElementById('special-defense').textContent = pokemon.stats[4].base_stat;
        document.getElementById('speed').textContent = pokemon.stats[5].base_stat;

    })
}

function updateLine(tab) {
    line.style.width = tab.offsetWidth + "px";
    line.style.left = tab.offsetLeft + "px";
}

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach((tabButton, tabIndex) => {
            tabButton.classList.remove('active');
            contentElements[tabIndex].classList.remove('active');
        });

        tab.classList.add('active');
        contentElements[index].classList.add('active');
        updateLine(tab);
    });
});

updateLine(tabs[0]);

document.addEventListener('DOMContentLoaded', () => {
    const pokemon = document.getElementById('pokemonInfoDiv');
    const pokemonName = getQueryParam('pokemon');
    const pokemonInfo = JSON.parse(localStorage.getItem("pokemonInfo"));
    
    const imageUrl = pokemonImages[pokemonInfo.name.toLowerCase()]

    pokemon.innerHTML = `
                <img src="${imageUrl}" width="100px" height="100px" 
                    alt="${pokemon.name}">
            </div>
        </div>
    `
    if (pokemonName) {
        loadPokemonDetails(pokemonName);
    }
});