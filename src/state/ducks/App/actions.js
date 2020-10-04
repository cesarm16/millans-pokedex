import { SET_LOCALE } from './constants'

export function changeLanguage(lang) {
	return { type: SET_LOCALE, payload: lang }
}
