import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '../../../commons/components'

function ErrorMessage({ onPress }) {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>⚠️Error al obtener datos⚠️</Text>
			<TouchableOpacity onPress={onPress} style={{ paddingVertical: 16 }}>
				<Text style={{ color: 'dodgerblue', decorationTextLine: 'underline' }}>Reintentar</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ErrorMessage
