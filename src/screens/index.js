import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import Screens from './Screens'

import Main from './Main'
import PokemonTopBar from './PokemonTopBar'
import Detail from './Detail'

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

	registerScreen(Screens.PokemonTopBar, PokemonTopBar)
}

export { registerScreens }
