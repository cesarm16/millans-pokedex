import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native'
import { Text } from '../../commons/components'
import ElevatedBox from './components/ElevatedBox'
import { capitalizeFirstLetter } from '../../commons/Helpers'
import { fetchPokemonSpecies } from '../../state/ducks/Species/actions'
import { useDispatch, useSelector } from 'react-redux'
import i18n from '../../commons/i18n'

function About({ pokemonId }) {
	if (!pokemonId) return null

	const dispatch = useDispatch()
	const pokemon = useSelector((state) => state.pokemon[pokemonId])
	const species = useSelector((state) => state.species[pokemonId])

	const locale = useSelector((state) => state.app.locale)

	const { sprites } = pokemon

	useEffect(() => {
		if (!species) dispatch(fetchPokemonSpecies(pokemon.species.url))
	}, [])

	if (!species) return <ActivityIndicator />

	const description = species.flavor_text_entries
		.find(
			(e) =>
				e.language.name === locale &&
				(e.version.name === 'omega-ruby' ||
					e.version.name === 'sword' ||
					e.version.name === 'shield')
		)
		.flavor_text.replace(/(\r\n|\n|\r)/gm, ' ')

	const height = pokemon.height * 10 + ' cm (' + cmToFeetInches(pokemon.height * 10) + ')'

	const weight = pokemon.weight / 10 + ' kg (' + (pokemon.weight * 0.2205).toFixed(2) + ' lbs)'

	const eggGroup = species.egg_groups.map((value, index) => {
		return capitalizeFirstLetter(value.name) + (species.egg_groups.length > index + 1 ? ', ' : '')
	})

	return (
		<View style={styles.container}>
			<Text type="description">{description}</Text>
			<ElevatedBox style={styles.box}>
				<View style={{ flex: 1 }}>
					<Text type="property">{i18n.t('detail.height')}</Text>
					<Text type="description" style={{ marginTop: 8 }}>
						{height}
					</Text>
				</View>
				<View style={{ flex: 1 }}>
					<Text type="property">{i18n.t('detail.weight')}</Text>
					<Text type="description" style={{ marginTop: 8 }}>
						{weight}
					</Text>
				</View>
			</ElevatedBox>
			<Text type="headline">{i18n.t('detail.characteristics')}</Text>
			<View style={[styles.propertyRow, { marginTop: 16 }]}>
				<Text type="property" style={styles.property}>
					{i18n.t('detail.name')}
				</Text>
				<Text type="description">
					{capitalizeFirstLetter(pokemon.name)} -{' '}
					{species.names.length > 0 && species.names[0].name}
				</Text>
			</View>
			<View style={[styles.propertyRow, { marginTop: 16 }]}>
				<Text type="property" style={styles.property}>
					{i18n.t('detail.species')}
				</Text>
				<Text type="description">
					{species.genera.length > 0 &&
						species.genera.find((e) => e.language.name === locale).genus}
				</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					{i18n.t('detail.gender')}
				</Text>
				<Text type="description">
					<Text type="description" style={{ color: 'cornflowerblue' }}>
						♂️
					</Text>
					{12.5 * (8 - species.gender_rate) + '%  '}{' '}
					<Text type="description" style={{ color: 'hotpink' }}>
						♀️
					</Text>
					{12.5 * species.gender_rate}%
				</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					{i18n.t('detail.egggroup')}
				</Text>
				<Text type="description">{eggGroup}</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					{i18n.t('detail.catchrate')}
				</Text>
				<Text type="description">{species.capture_rate}</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					{i18n.t('detail.generation')}
				</Text>
				<Text type="description">{capitalizeFirstLetter(species.generation.name)}</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					{i18n.t('detail.hatchtime')}
				</Text>
				<Text type="description">
					{species.hatch_counter} cycles - {255 * (species.hatch_counter + 1)} steps
				</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					{i18n.t('detail.levelingrate')}
				</Text>
				<Text type="description">
					{species.growth_rate && capitalizeFirstLetter(species.growth_rate.name)}
				</Text>
			</View>
			<Text type="headline" style={{ marginTop: 24 }}>
				{i18n.t('detail.location')}
			</Text>
			<View style={styles.mockLocation}></View>
			<Text type="headline" style={{ marginTop: 24 }}>
				{i18n.t('detail.sprites')}
			</Text>
			{sprites.back_default && (
				<View style={styles.spriteContainer}>
					<Image source={{ uri: pokemon.sprites.back_default }} style={styles.sprite}></Image>
					<Text type="property" style={{ flex: 1 }}>
						Default depiction from the back in battle
					</Text>
				</View>
			)}
			{sprites.back_female && (
				<View style={styles.spriteContainer}>
					<Image source={{ uri: pokemon.sprites.back_female }} style={styles.sprite}></Image>
					<Text type="property" style={{ flex: 1 }}>
						Female depiction from the back in battle
					</Text>
				</View>
			)}
			{sprites.back_shiny && (
				<Image source={{ uri: sprites.back_shiny }} style={styles.sprite}></Image>
			)}
			{sprites.back_shiny_female && (
				<Image source={{ uri: sprites.back_shiny_female }} style={styles.sprite}></Image>
			)}
			{sprites.front_default && (
				<Image source={{ uri: sprites.front_default }} style={styles.sprite}></Image>
			)}
			{sprites.front_female && (
				<Image source={{ uri: sprites.front_female }} style={styles.sprite}></Image>
			)}
			{sprites.front_shiny && (
				<Image source={{ uri: sprites.front_shiny }} style={styles.sprite}></Image>
			)}
			{sprites.front_shiny_female && (
				<Image source={{ uri: sprites.front_shiny_female }} style={styles.sprite}></Image>
			)}
		</View>
	)
}

function cmToFeetInches(cm) {
	var lenght = cm / 2.54
	var feet = Math.floor(lenght / 12)
	var inches = lenght - 12 * feet
	return feet + "'" + inches.toFixed(1) + '"'
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 16 },
	box: { flexDirection: 'row', marginVertical: 32 },
	propertyRow: { flexDirection: 'row', marginTop: 16, alignItems: 'center' },
	property: { width: 135 },
	mockLocation: {
		height: 150,
		backgroundColor: 'khaki',
		marginTop: 16,
		borderRadius: 15
	},
	sprite: { height: 80, width: 80 },
	spriteContainer: { flexDirection: 'row', alignItems: 'center' }
})

export default About
