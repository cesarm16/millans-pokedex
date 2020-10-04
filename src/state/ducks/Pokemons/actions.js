import { FETCH_THEM_ALL, FIRST_GENERATION_POKEMON } from './constants'
import axios from 'axios'

export function fetchAllPokemons() {
	return (dispatch) =>
		axios('https://pokeapi.co/api/v2/pokemon?limit=1050')
			.then((response) => {
				let { results } = response.data
				let promises = results.slice(0, 150).map((result) => {
					return axios(result.url).then((response) => response.data)
				})
				dispatch({ type: FETCH_THEM_ALL, payload: results })
				return Promise.all(promises)
			})
			.then((results) => {
				dispatch({ type: FIRST_GENERATION_POKEMON, payload: results })
			})
}
