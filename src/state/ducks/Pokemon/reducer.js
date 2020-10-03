import initialState from '../../utils/initialState'
import { FETCH_POKEMON } from './constants'
import { FIRST_GENERATION_POKEMON } from '../Pokemons/constants'

export default function (state = initialState.pokemon, action) {
	switch (action.type) {
		case FIRST_GENERATION_POKEMON:
			const arr = action.payload
			let bigObj = {}
			for (let i = 0; i < arr.length; i++) bigObj[arr[i].id] = arr[i]

			return { ...state, ...bigObj }
		case FETCH_POKEMON:
			const { id } = action.payload
			return { ...state, [id]: action.payload }
		default:
			return state
	}
}
