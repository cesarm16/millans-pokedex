import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Text, NavigationButton } from '../../../commons/components'
import { LANGUAGES, setLocale } from '../../../commons/i18n'
import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from '../../../state/ducks/App/actions'
import { setRoot } from '../../../app'

function Language() {
	const dispatch = useDispatch()
	const locale = useSelector((state) => state.app.locale)

	async function setEnglish() {
		Alert.alert('Restart required', 'Do you want to continue?', [
			{
				text: 'Continue',
				onPress: () => {
					changeLanguageAction(LANGUAGES.ENGLISH)
				}
			},
			{ text: 'Cancel', style: 'cancel' }
		])
	}

	async function setSpanish() {
		Alert.alert('Requiere reiniciar', '¿Desea continuar?', [
			{
				text: 'Continuar',
				onPress: () => {
					changeLanguageAction(LANGUAGES.SPANISH)
				}
			},
			{ text: 'Cancelar', style: 'cancel' }
		])
	}

	async function changeLanguageAction(lang) {
		await dispatch(changeLanguage(lang))
		setLocale(lang)
		setRoot()
	}

	return (
		<View style={styles.container}>
			<Text type="property" style={{ marginLeft: 16, marginBottom: 8 }}>
				Select your language
			</Text>
			<NavigationButton type={locale === LANGUAGES.SPANISH && 'selected'} onPress={setSpanish}>
				Español
			</NavigationButton>
			<NavigationButton type={locale === LANGUAGES.ENGLISH && 'selected'} onPress={setEnglish}>
				English
			</NavigationButton>
		</View>
	)
}

const styles = StyleSheet.create({ container: { flex: 1, paddingTop: 12 } })

export default Language
