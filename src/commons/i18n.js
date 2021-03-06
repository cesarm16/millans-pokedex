import I18n from 'i18n-js'
import * as RNLocalize from 'react-native-localize'

import es from './locales/es'
import en from './locales/en'

const locales = RNLocalize.getLocales()

if (Array.isArray(locales)) {
	setLocale(locales[0].languageTag)
}

I18n.fallbacks = true
I18n.translations = { es, en }

export const LANGUAGES = { SPANISH: 'es', ENGLISH: 'en' }

export function setLocale(locale) {
	locale = locale.indexOf('-') === -1 ? locale : locale.substr(0, locale.indexOf('-'))
	I18n.locale = locale
}

export function currentLocale() {
	return I18n.currentLocale()
}

export default I18n
