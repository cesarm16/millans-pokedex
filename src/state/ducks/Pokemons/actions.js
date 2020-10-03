import { FETCH_THEM_ALL, FIRST_GENERATION_POKEMON } from './constants'

export function fetchAllPokemons() {
	return (dispatch) =>
		fetch('https://pokeapi.co/api/v2/pokemon?limit=1050')
			.then((response) => response.json())
			.then((json) => {
				let { results } = json
				let promises = results.slice(0, 150).map((result) => {
					return fetch(result.url).then((response) => response.json())
				})
				dispatch({ type: FETCH_THEM_ALL, payload: results })
				return Promise.all(promises)
			})
			.then((results) => {
				dispatch({ type: FIRST_GENERATION_POKEMON, payload: results })
			})
}
