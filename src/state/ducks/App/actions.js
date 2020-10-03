import { setLocale } from '../../../commons/i18n'
import { SET_LOCALE } from './constants'

export function changeLanguage(lang) {
	setLocale(lang)
	return { type: SET_LOCALE, payload: lang }
}
