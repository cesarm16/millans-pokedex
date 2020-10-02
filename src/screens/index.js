import { Navigation } from 'react-native-navigation'
import Screens from './Screens'

import Main from './Main'
import PokemonTopBar from './PokemonTopBar'
import Detail from './Detail'

function registerScreens() {
	Navigation.registerComponent(Screens.Main, () => Main)
	Navigation.registerComponent(Screens.PokemonTopBar, () => PokemonTopBar)
	Navigation.registerComponent(Screens.Detail, () => Detail)
}

export { registerScreens }
