import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

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
		backgroundColor: 'lightgray',
		borderRadius: 30,
		overflow: 'hidden'
	},
	input: { height: 40, fontSize: 17 }
})

export default Input
