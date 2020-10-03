import initialState from '../../utils/initialState'
import { FETCH_THEM_ALL, FETCH_POKEMON } from './constants'

export default function (state = initialState.pokemons, action) {
	switch (action.type) {
		case FETCH_THEM_ALL:
			return {
				...state,
				fetched: true,
				list: [...action.payload],
				progress: Math.round((100 * action.endRange) / 1050)
			}
		case FETCH_POKEMON:
			const i = state.list.findIndex((e) => e.name === action.payload.name)
			return {
				...state,
				list: state.list.map((item, index) => {
					if (index !== i) return item
					return { ...item, fetched: true, properties: action.payload }
				})
			}
		default:
			return state
	}
}
