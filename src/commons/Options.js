import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'
import Colors from './Colors'

function setDefaultOptions() {
	Navigation.setDefaultOptions({
		layout: { componentBackgroundColor: Colors.background, orientation: ['portrait'] },
		topBar: {
			title: { fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto' },
			largeTitle: { fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto' },
			backButton: { title: '', color: 'black' },
			background: { color: Colors.background },
			borderHeight: 0,
			noBorder: true
		}
	})
}

export { setDefaultOptions }
