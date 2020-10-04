import React from 'react'
import { View } from 'react-native'
import { Text, NavigationButton } from '../../commons/components'
import { Navigation } from 'react-native-navigation'
import Screens from '../Screens'
import i18n from '../../commons/i18n'

function Settings({ componentId }) {
	return (
		<View style={{ flex: 1, paddingTop: 12 }}>
			<Text type="property" style={{ paddingLeft: 16, marginBottom: 8 }}>
				General
			</Text>
			<NavigationButton
				type="push"
				onPress={() => {
					Navigation.push(componentId, {
						component: {
							name: Screens.Language,
							options: { topBar: { title: { text: i18n.t('settings.language') } } }
						}
					})
				}}>
				{i18n.t('settings.language')}
			</NavigationButton>
		</View>
	)
}

export default Settings
