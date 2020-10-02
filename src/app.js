import { Navigation } from 'react-native-navigation'
import { registerScreens } from './screens'
import { setDefaultOptions } from './commons/Options'
import Screens from './screens/Screens'

import configureStore from './state/store'

const { store, rehydrateStore } = configureStore()

function start() {
	registerScreens(store)
	setDefaultOptions()
	rehydrateStore()
	Navigation.events().registerAppLaunchedListener(async () => {
		Navigation.dismissAllModals()
		setRoot()
	})
}

function setRoot() {
	Navigation.setRoot({
		root: {
			stack: {
				children: [
					{
						component: {
							name: Screens.Main
						}
					}
				]
			}
		}
	})
}

export { start }
