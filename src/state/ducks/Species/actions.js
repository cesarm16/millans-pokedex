import { FETCH_POKEMON_SPECIES } from './constants'

export function fetchPokemonSpecies(url) {
	return (dispatch) =>
		fetch(url)
			.then((response) => response.json())
			.then((response) => dispatch({ type: FETCH_POKEMON_SPECIES, payload: response }))
}
