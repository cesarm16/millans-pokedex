import React from 'react'
import { View, TextInput, StyleSheet, Platform } from 'react-native'

function Input({ style, ...props }) {
	return (
		<View style={[styles.container, style]}>
			<TextInput
				autoCorrect={false}
				placeholderTextColor={'gray'}
				style={styles.input}
				{...props}
				clearButtonMode="while-editing"></TextInput>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		backgroundColor: '#E4E5E6',
		borderRadius: 15,
		overflow: 'hidden'
	},
	input: {
		height: 38,
		fontSize: 16,
		fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
		lineHeight: 23
	}
})

export default Input
