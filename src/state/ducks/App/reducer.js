import initialState from '../../utils/initialState'
import { SET_LOCALE } from './constants'

export default function (state = initialState.app, action) {
	switch (action.type) {
		case SET_LOCALE:
			return { ...state, locale: action.payload }
		default:
			return state
	}
}
