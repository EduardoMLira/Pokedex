const tabs = document.querySelectorAll('.tabButton');
const contentElements = document.querySelectorAll('.contentSpecifications');
const line = document.querySelector('.line');

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
    const pokemonName = getQueryParam('pokemon');

    if (pokemonName) {
        loadPokemonDetails(pokemonName);
    }
});