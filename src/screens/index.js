import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import Screens from './Screens'

import Main from './Main'
import Detail from './Detail'
import Camera from './Camera'
import Settings from './Settings'

function registerScreens(store) {
	function registerScreenWithRedux(n, ReduxScreen) {
		Navigation.registerComponent(
			n,
			() => (props) => (
				<Provider store={store}>
					<ReduxScreen {...props} />
				</Provider>
			),
			() => ReduxScreen
		)
	}

	function registerScreen(n, Screen) {
		Navigation.registerComponent(n, () => Screen)
	}

	registerScreenWithRedux(Screens.Main, Main)
	registerScreenWithRedux(Screens.Detail, Detail)
	registerScreenWithRedux(Screens.Settings, Settings)

	registerScreen(Screens.Camera, Camera)
}

export { registerScreens }
