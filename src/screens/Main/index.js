import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { SearchBar, Text } from '../../commons/components'

function Main({ componentId }) {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text type="title1">Pokedex</Text>
			<SearchBar style={{ marginVertical: 16 }} componentId={componentId}></SearchBar>
		</ScrollView>
	)
}

const styles = StyleSheet.create({ container: { paddingHorizontal: 16, paddingTop: 16 } })

export default Main
