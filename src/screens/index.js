import { Navigation } from 'react-native-navigation'
import Screens from './Screens'

import Main from './Main'

function registerScreens() {
	Navigation.registerComponent(Screens.Main, () => Main)
}

export { registerScreens }
