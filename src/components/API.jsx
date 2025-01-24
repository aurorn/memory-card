/* This is where the API call will be made to get the data for the cards */

import Pokedex from 'pokedex-promise-v2'

const P = new Pokedex();

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

export const fetchPokemonData = async(limit = 20) => {
    try {
        const response = await P.getPokemonsList({ limit });
        const pokemonDetails = await Promise.all(response.results.map(async pokemon => {
            const details = await P.getPokemonByName(pokemon.name);
            const type = details.types[0].type.name; // Get primary type
            return {
                id: details.id,
                name: capitalize(details.name),
                image: details.sprites.front_default,
                type: type,
                typeColor: typeColors[type]
            };
        }));
        return pokemonDetails;
    } catch (error) {
        console.error("Error fetching pokemon data", error);
        return [];
    }
};