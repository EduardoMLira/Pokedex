const tabs = document.querySelectorAll('.tabButton');
const contentElements = document.querySelectorAll('.contentSpecifications');
const line = document.querySelector('.line');

function loadPokemonDetails(pokemonName) {
    pokeApi.getPokemonDetailsByName(pokemonName).then((pokemon) =>{
    document.getElementById('species').textContent = pokemon.species;
    })
}

console.log(loadPokemonDetails)

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