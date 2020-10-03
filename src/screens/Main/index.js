import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import { fetchAllPokemons } from '../../state/ducks/Pokemons/actions'
import { SearchBar, Text } from '../../commons/components'
import { useNavigationButtonPressed } from '../../commons/Helpers'
import Screens from '../Screens'
import PokemonCard from './components/Card'
import Colors from '../../commons/Colors'
import ButtonIds from '../ButtonIds'

function Main({ componentId }) {
	const data = useSelector((state) => state.pokemons)
	const pokemons = data.list
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAllPokemons()).catch((error) => console.error(error))
	}, [])

	useNavigationButtonPressed(({ buttonId }) => {
		if (ButtonIds.BUTTON_CAMERA === buttonId)
			Navigation.showModal({
				stack: {
					children: [
						{
							component: {
								name: Screens.Camera,
								options: { topBar: { title: { text: 'Scan a Pokémon' } } }
							}
						}
					]
				}
			})
		if (ButtonIds.BUTTON_SETTINGS === buttonId)
			Navigation.showModal({
				stack: {
					children: [
						{
							component: {
								name: Screens.Settings,
								options: { topBar: { title: { text: 'Settings' } } }
							}
						}
					]
				}
			})
	}, componentId)

	if (!data.fetched)
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator />
			</View>
		)

	const header = (
		<View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
			<SearchBar style={{ marginTop: 8 }} componentId={componentId}></SearchBar>
		</View>
	)

	const renderItem = ({ item }) => {
		return (
			<PokemonCard
				pokemon={item}
				onPress={() => {
					Icon.getImageSource('hearto', 26, 'white').then((icon) => {
						Navigation.push(componentId, {
							component: {
								name: Screens.Detail,
								passProps: { pokemon: item },
								options: {
									animations: getAnimations(item),
									topBar: {
										background: { color: Colors.types[item.properties.types[0].type.name] },
										backButton: { color: Colors.background },
										rightButtons: [{ id: 'right', icon }]
									}
								}
							}
						})
					})
				}}></PokemonCard>
		)
	}

	return (
		<FlatList
			ListHeaderComponent={header}
			columnWrapperStyle={styles.row}
			data={pokemons.slice(0, 150)}
			numColumns={3}
			initialNumToRender={15}
			keyExtractor={({ name }) => name}
			renderItem={renderItem}
			removeClippedSubviews
			keyboardDismissMode="on-drag"
			ItemSeparatorComponent={() => <View style={styles.separator}></View>}
		/>
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
					interpolation: 'decelerate',
					duration: LONG_DURATION
				},
				{
					fromId: item.name + 'titlecard',
					toId: item.name + 'titledetail',
					interpolation: 'decelerate',
					duration: SHORT_DURATION
				}
			]
		}
	}
}

const styles = StyleSheet.create({
	loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	row: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 16 },
	separator: { height: 16 }
})

export default Main
