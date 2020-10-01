import { Navigation } from 'react-native-navigation'
import Colors from './Colors'
import Screens from '../screens/Screens'

function setDefaultOptions() {
	Navigation.setDefaultOptions({
		layout: { componentBackgroundColor: Colors.background, orientation: ['portrait'] },
		topBar: {
			title: { component: { name: Screens.PokemonTopBar } },
			background: { color: Colors.background },
			borderHeight: 0,
			noBorder: true
		}
	})
}

export { setDefaultOptions }
