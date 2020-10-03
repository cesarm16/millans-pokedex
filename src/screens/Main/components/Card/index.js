import React, { useEffect } from 'react'
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Text } from '../../../../commons/components'
import { capitalizeFirstLetter } from '../../../../commons/Helpers'
import { fetchPokemonProperties } from '../../../../state/ducks/Pokemons/actions'
import StyleGuide from './StyleGuide'
import { useDispatch } from 'react-redux'

const Card = React.memo(({ pokemon, onPress }) => {
	const { fetched, properties } = pokemon
	const dispatch = useDispatch()

	const boxStyle = fetched ? StyleGuide.types[properties.types[0].type.name] : null

	const badges = fetched && (
		<View style={styles.badgeContainer}>
			{properties.types.map((value, index) => (
				<Badge type={value.type} key={value.slot}></Badge>
			))}
		</View>
	)

	const pokemonImg = fetched && (
		<Image
			nativeID={pokemon.name + 'card'}
			source={{
				uri: properties.sprites.other['official-artwork'].front_default
			}}
			style={styles.image}></Image>
	)

	useEffect(() => {
		if (!fetched) dispatch(fetchPokemonProperties(pokemon))
	}, [])

	return (
		<TouchableWithoutFeedback onPress={onPress} disabled={!fetched}>
			<View style={[styles.container, boxStyle]}>
				<Image source={POKEBALL} style={styles.pokeball}></Image>
				{pokemonImg}
				<Text
					type="headline"
					style={{ color: 'white', fontWeight: 'bold' }}
					nativeID={pokemon.name + 'titlecard'}>
					{capitalizeFirstLetter(pokemon.name)}
				</Text>
				{badges}
			</View>
		</TouchableWithoutFeedback>
	)
})

function Badge({ type }) {
	return (
		<View style={styles.badge}>
			<Text style={styles.badgeText} type="caption">
				{capitalizeFirstLetter(type.name)}
			</Text>
		</View>
	)
}

const POKEBALL = require('../../../../assets/images/pokeball.png')

const styles = StyleSheet.create({
	container: {
		width: 110,
		height: 110,
		backgroundColor: 'lightgray',
		borderRadius: 10,
		paddingLeft: 8,
		paddingTop: 8,
		borderWidth: 1,
		overflow: 'hidden'
	},
	image: {
		width: 75,
		height: 75,
		position: 'absolute',
		bottom: -4,
		right: -4
	},
	badge: {
		backgroundColor: 'rgba(250,250,250,0.3)',
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 0,
		marginBottom: 4
	},
	badgeContainer: { marginTop: 4, alignItems: 'flex-start' },
	badgeText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 8,
		lineHeight: 12
	},
	pokeball: { position: 'absolute', opacity: 0.15, bottom: -8, right: -8, height: 100, width: 100 }
})

export default Card
