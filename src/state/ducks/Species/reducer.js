import initialState from '../../utils/initialState'
import { FETCH_POKEMON_SPECIES } from './constants'

export default function (state = initialState.species, action) {
	switch (action.type) {
		case FETCH_POKEMON_SPECIES:
			const { id } = action.payload
			return { ...state, [id]: action.payload }
		default:
			return state
	}
}
