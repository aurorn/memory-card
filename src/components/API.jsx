/* This is where the API call will be made to get the data for the cards */

import Pokedex from 'pokedex-promise-v2'

const P = new Pokedex();

export const fetchPokemonData = async(limit = 20) => {
    try {
        const response = await P.getPokemonsList({ limit});
        const pokemonDetails = await Promise.all(response.results.map(async pokemon => {
            const details = await P.getPokemonByName(pokemon.name);
            return {
                id: details.id,
                name: details.name,
                image: details.sprites.front_default
                // more data if needed
            };
    })
    );
    return pokemonDetails;
    } catch (error) {
        console.error("Error fetching pokemon data", error);
        return [];
    }
};