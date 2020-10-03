import { FETCH_POKEMON } from './constants'

export function fetchPokemon(url) {
	return (dispatch) =>
		fetch(url)
			.then((response) => response.json())
			.then((response) => dispatch({ type: FETCH_POKEMON, payload: response }))
}
