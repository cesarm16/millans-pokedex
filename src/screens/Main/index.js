import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { SearchBar, Text } from '../../commons/components'
import Screens from '../Screens'
import PokemonCard from './components/Card'
import Colors from '../../commons/Colors'

function Main({ componentId }) {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon')
			.then((response) => response.json())
			.then((json) => {
				let results = json.results
				let promisesArray = results.map((result) => {
					return fetch(result.url).then((response) => response.json())
				})
				return Promise.all(promisesArray)
			})
			.then((data) => setData(data))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false))
	}, [])

	return (
		<View style={styles.container}>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator />
				</View>
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
							pokemon={item}
							onPress={() => {
								Navigation.push(componentId, {
									component: {
										name: Screens.Detail,
										passProps: { pokemon: item },
										options: {
											animations: getAnimations(item),
											topBar: {
												background: { color: Colors.types[item.types[0].type.name] },
												backButton: { color: Colors.background }
											}
										}
									}
								})
							}}></PokemonCard>
					)}
					ItemSeparatorComponent={() => <View style={styles.separator}></View>}
				/>
			)}
		</View>
	)
}

const MULTIPLIER = 0.65
const LONG_DURATION = 350 * MULTIPLIER
const SHORT_DURATION = 190 * MULTIPLIER

function getAnimations(item) {
	return {
		push: {
			waitForRender: true,
			content: {
				alpha: {
					from: 0,
					to: 1,
					duration: LONG_DURATION
				}
			},
			sharedElementTransitions: [
				{
					fromId: item.name + 'card',
					toId: item.name + 'detail',
					interpolation: 'overshoot',
					duration: LONG_DURATION
				},
				{
					fromId: item.name + 'titlecard',
					toId: item.name + 'titledetail',
					interpolation: 'overshoot',
					duration: SHORT_DURATION
				}
			]
		}
	}
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	row: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 16 },
	separator: { height: 24 }
})

export default Main
