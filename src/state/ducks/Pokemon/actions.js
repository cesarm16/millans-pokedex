import { FETCH_POKEMON } from './constants'
import axios from 'axios'

export function fetchPokemon(url) {
	return (dispatch) =>
		axios(url).then((response) => dispatch({ type: FETCH_POKEMON, payload: response.data }))
}
