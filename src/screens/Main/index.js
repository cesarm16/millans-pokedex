import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Main() {
	return (
		<View style={styles.container}>
			<Text>POKEDEX</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default Main
