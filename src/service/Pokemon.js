import pokemons from '../pokemons/pokemons.json';
import * as fsPromises from 'fs/promises';
import path from 'path';

export async function getPokemons(args) {
  const searchedPokemons = pokemons.slice(0, args.first);

  // const edges = searchedPokemons.map(pokemon => ({ node: pokemon }));

  return searchedPokemons || null;
}

export async function updatePokemonByID(pokemonId, name) {
  let idx = pokemons.findIndex(pokemon => {
    return pokemon.id == pokemonId
  });

  if (idx < 0) {
    throw new Error(`Pokemon by ID ${pokemonId} not found`);
  }

  pokemons[idx].name = name;

  await fsPromises.writeFile(path.join(__dirname, '../pokemons/pokemons.json'), JSON.stringify(pokemons, null, 2));

  return pokemons[idx] || null;
}

export async function getPokemonById(pokemonId) {
  const pokemon = pokemons.filter(({ id }) =>
    parseInt(id, 10) === parseInt(pokemonId, 10)
  );

  return pokemon[0] || null;
}

export async function getPokemonByName(pokemonNameSearch) {
  const pokemonName = pokemonNameSearch.toLowerCase().trim();

  const pokemon = pokemons.filter(({ name }) =>
    name.toLowerCase() === pokemonName
  );

  if (pokemon) {
    return pokemon[0];
  }

  return pokemon[0] || null;
}

export async function getPokemonByEvolutions(evolutions) {
  if (!evolutions) {
    return null;
  }

  const pokemonNames = evolutions.map(evolution =>
    evolution.name.toLowerCase().trim()
  );

  const searchedPokemons = pokemons.filter(({ name }) =>
    pokemonNames.indexOf(name.toLowerCase()) !== -1
  );

  return searchedPokemons || null;
}
