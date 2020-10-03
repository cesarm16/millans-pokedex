import { FETCH_THEM_ALL, FETCH_POKEMON } from './constants'

export function fetchAllPokemons() {
	return (dispatch) =>
		fetch('https://pokeapi.co/api/v2/pokemon?limit=1050')
			.then((response) => response.json())
			.then((json) => {
				let { results } = json
				let promises = results.map((result, index) => {
					if (index <= 150)
						return fetch(result.url)
							.then((response) => response.json())
							.then((response) => ({ ...result, properties: { ...response }, fetched: true }))
					return result
				})
				return Promise.all(promises)
			})
			.then((results) => {
				dispatch({ type: FETCH_THEM_ALL, payload: results })
			})
}

export function fetchPokemonProperties(pokemon) {
	return (dispatch) =>
		fetch(pokemon.url)
			.then((response) => response.json())
			.then((response) => dispatch({ type: FETCH_POKEMON, payload: response }))
}
