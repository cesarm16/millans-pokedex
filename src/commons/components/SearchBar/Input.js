import React from 'react'
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import Colors from '../../Colors'

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
		borderRadius: 30,
		overflow: 'hidden'
	},
	input: { height: 32, fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto' }
})

export default Input
