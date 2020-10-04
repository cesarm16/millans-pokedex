import { Navigation } from 'react-native-navigation'
import { registerScreens } from './screens'
import { setDefaultOptions } from './commons/Options'
import Screens from './screens/Screens'
import ButtonIds from './screens/ButtonIds'

import Icon from 'react-native-vector-icons/AntDesign'

import { setLocale } from './commons/i18n'

import configureStore from './state/store'

const { store, rehydrateStore } = configureStore()

function start() {
	registerScreens(store)
	setDefaultOptions()
	Navigation.events().registerAppLaunchedListener(async () => {
		Navigation.dismissAllModals()
		await rehydrateStore()
		const { locale } = store.getState().app
		if (locale) setLocale(locale)
		setRoot()
	})
}

function setRoot() {
	Promise.all([Icon.getImageSource('camerao', 26), Icon.getImageSource('setting', 26)]).then(
		(icons) => {
			Navigation.setRoot({
				root: {
					stack: {
						children: [
							{
								component: {
									name: Screens.Main,
									options: {
										topBar: {
											largeTitle: { visible: true },
											title: { text: 'Pokedex' },
											leftButtons: [{ id: 'pokemon', icon: POKEMON }],
											rightButtons: [
												{ id: ButtonIds.BUTTON_CAMERA, icon: icons[0] },
												{ id: ButtonIds.BUTTON_SETTINGS, icon: icons[1] }
											]
										}
									}
								}
							}
						]
					}
				}
			})
		}
	)
}

const POKEMON = require('./assets/images/pokemon.png')

export { start, setRoot }
