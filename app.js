let pokemons = [];
const pokemonContainer = document.getElementById("pokemonContainer");
const url = "https://pokeapi.co/api/v2/pokemon";
const pokemonNumero = 200;
const buscador = document.getElementById("buscador");
const form = document.getElementById("form");

const fetchpokemons = async () => {
    for (let i = 1; i <= pokemonNumero; i++) {
        await getAllpokemon(i);
    }
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const retirarPokemon = () => {
    const pokemonEls = document.getElementsByClassName("pokemon");
    let pokemonRemovible = [];
    for (let i = 0; i < pokemonEls.length; i++) {
        const pokemonEl = pokemonEls[i];
        pokemonRemovible = [...pokemonRemovible, pokemonEl];
    }
    pokemonRemovible.forEach((remPoke)=>remPoke.remove());
};
const getPokemon = async (id) => {
     const buscarPokemon = pokemons.filter((poke) => poke.name === id);
     retirarPokemon();
     buscarPokemon.forEach((pokemon) => createPokemonCard(pokemon));
};
const getAllpokemon = async (id) => {
    const res = await fetch(`${url}/${id}`);
    const pokemon = await res.json();
    pokemons = [...pokemons,pokemon];
}
fetchpokemons();

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    const pokeTipos = pokemon.types.map((el) => el.type.name).slice(0, 1);
    const nombre = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokeStat = pokemon.stats.map((el) => el.stat.name);
    const stats = pokeStat.slice(0, 3);
    const valorBase = pokemon.stats.map((el) => el.statBase);
    const statBase = valorBase.slice(0, 3);
    const stat = stats.map((stat) => {
        return `<li class="nombres">${stat}</li>`;
    }).join("");
    const base = statBase.map((base) => {
        return `<li class="base">${base}</li>`
    }).join("");
    const pokeInnerHTML = `<div class="imgContainer">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${nombre}"/>
    </div>
    <div class="info">
    <span class="numero">#${pokemon.id.toString().padStart(3, "0")}</span>
    <h3 class="nombre">${nombre}</h3>
    <small class="tipo"><span>${pokeTipos}</span></small>
    </div>
    <div class="stats">
    <h2>Stats</h2>
    <div class="flex">
    <ul>${stat}</ul>
    <ul>${base}</ul>
    </div>
    </div>`;
    pokemonEl.innerHTML = pokeInnerHTML;
    pokemonContainer.appendChild(pokemonEl);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const buscadorTerm = buscador.value;
    if (buscadorTerm) {
        getPokemon(buscadorTerm);
        buscador.value = "";
    } else if (buscadorTerm === "") {
        pokemons = [];
        retirarPokemon();
        fetchpokemons();        
    }
});
