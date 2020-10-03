import React, { useEffect } from 'react'
import { View, Image, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Text } from '../../../../commons/components'
import { capitalizeFirstLetter } from '../../../../commons/Helpers'
import { fetchPokemon } from '../../../../state/ducks/Pokemon/actions'
import StyleGuide from './StyleGuide'
import { useDispatch, useSelector } from 'react-redux'

const Card = React.memo(({ pokemonId, name, url, onPress }) => {
	const pokemon = useSelector((state) => state.pokemon[pokemonId])

	const dispatch = useDispatch()

	const boxStyle = pokemon ? StyleGuide.types[pokemon.types[0].type.name] : null

	const badges = pokemon && (
		<View style={styles.badgeContainer}>
			{pokemon.types.map((value, index) => (
				<Badge type={value.type} key={value.slot}></Badge>
			))}
		</View>
	)

	const pokemonImg = pokemon ? (
		<Image
			nativeID={pokemon.name + 'card'}
			source={{
				uri: pokemon.sprites.other['official-artwork'].front_default
			}}
			style={styles.image}></Image>
	) : (
		<ActivityIndicator style={styles.loader}></ActivityIndicator>
	)

	useEffect(() => {
		if (!pokemon) dispatch(fetchPokemon(url))
	}, [])

	function customOnPress() {
		onPress(pokemon.types[0].type.name)
	}

	return (
		<TouchableWithoutFeedback onPress={customOnPress} disabled={!pokemon}>
			<View style={[styles.container, boxStyle]}>
				<Image source={POKEBALL} style={styles.pokeball}></Image>
				{pokemonImg}
				<Text
					type="headline"
					style={{ color: 'white', fontWeight: 'bold' }}
					nativeID={name + 'titlecard'}>
					{capitalizeFirstLetter(name)}
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
	loader: { position: 'absolute', bottom: 8, right: 8 },
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
	pokeball: {
		position: 'absolute',
		opacity: 0.15,
		bottom: -12,
		right: -16,
		height: 100,
		width: 100
	}
})

export default Card
