import initialState from '../../utils/initialState'
import { FETCH_THEM_ALL, FETCH_POKEMON, FIRST_GENERATION_POKEMON } from './constants'

export default function (state = initialState.pokemons, action) {
	switch (action.type) {
		case FETCH_THEM_ALL:
			return {
				...state,
				list: [...action.payload]
			}
		case FIRST_GENERATION_POKEMON:
			return { ...state, fetched: true }
		case FETCH_POKEMON:
			const i = state.list.findIndex((e) => e.name === action.payload.name)
			return {
				...state,
				list: state.list.map((item, index) => {
					if (index !== i) return item
					return { ...item, properties: { ...action.payload }, fetched: true }
				})
			}
		default:
			return state
	}
}
