import { FETCH_POKEMON_SPECIES } from './constants'
import axios from 'axios'

export function fetchPokemonSpecies(url) {
	return (dispatch) =>
		axios(url).then((response) => dispatch({ type: FETCH_POKEMON_SPECIES, payload: response.data }))
}
