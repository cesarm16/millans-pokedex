import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { SearchBar, Text } from '../../commons/components'
import Screens from '../Screens'
import PokemonCard from './components/Card'

function Main({ componentId }) {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon')
			.then((response) => response.json())
			.then((json) => setData(json.results))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false))
	}, [])

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					ListHeaderComponent={
						<View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
							<Text type="title1">Pokedex</Text>
							<SearchBar
								style={{ marginTop: 8, marginBottom: 24 }}
								componentId={componentId}></SearchBar>
						</View>
					}
					columnWrapperStyle={styles.row}
					data={data}
					numColumns={2}
					keyExtractor={({ name }, index) => name}
					renderItem={({ item }) => (
						<PokemonCard
							onPress={() => {
								Navigation.push(componentId, {
									component: { name: Screens.Detail },
									passProps: { pokemon: item }
								})
							}}
							{...item}></PokemonCard>
					)}
					ItemSeparatorComponent={() => <View style={styles.separator}></View>}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	row: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 16 },
	separator: { height: 24 }
})

export default Main
