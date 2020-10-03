import { useEffect } from 'react'
import { Navigation } from 'react-native-navigation'

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export function useNavigationButtonPressed(handler, componentId) {
	useEffect(() => {
		const sub = Navigation.events().registerNavigationButtonPressedListener((event) => {
			if (event.componentId === componentId) {
				handler(event)
			}
		})
		return () => {
			sub.remove()
		}
	}, [componentId])
}
