import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native'
import { Text } from '../../commons/components'
import ElevatedBox from './components/ElevatedBox'
import { capitalizeFirstLetter } from '../../commons/Helpers'

function About({ pokemon, dataFetched }) {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		fetch(pokemon.species.url)
			.then((response) => response.json())
			.then((json) => {
				setData(json)
				if (dataFetched) dataFetched()
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false))
	}, [])

	if (isLoading) return <ActivityIndicator />

	const { sprites } = pokemon

	const description = data.flavor_text_entries[44].flavor_text.replace(/(\r\n|\n|\r)/gm, ' ')

	const height = pokemon.height * 10 + ' cm (' + cmToFeetInches(pokemon.height * 10) + ')'

	const weight = pokemon.weight / 10 + ' kg (' + (pokemon.weight * 0.2205).toFixed(2) + ' lbs)'

	const eggGroup = data.egg_groups.map((value, index) => {
		return capitalizeFirstLetter(value.name) + (data.egg_groups.length > index + 1 ? ', ' : '')
	})

	return (
		<View style={styles.container}>
			<Text type="description">{description}</Text>
			<ElevatedBox style={styles.box}>
				<View style={{ flex: 1 }}>
					<Text type="property">Height</Text>
					<Text type="description" style={{ marginTop: 8 }}>
						{height}
					</Text>
				</View>
				<View style={{ flex: 1 }}>
					<Text type="property">Weight</Text>
					<Text type="description" style={{ marginTop: 8 }}>
						{weight}
					</Text>
				</View>
			</ElevatedBox>
			<Text type="headline">Characteristics</Text>
			<View style={[styles.propertyRow, { marginTop: 16 }]}>
				<Text type="property" style={styles.property}>
					Name
				</Text>
				<Text type="description">
					{data.names[8].name} - {data.names[0].name}
				</Text>
			</View>
			<View style={[styles.propertyRow, { marginTop: 16 }]}>
				<Text type="property" style={styles.property}>
					Species
				</Text>
				<Text type="description">{data.genera[7].genus}</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					Gender
				</Text>
				<Text type="description">
					<Text type="description" style={{ color: 'cornflowerblue' }}>
						♂️
					</Text>
					{12.5 * (8 - data.gender_rate) + '%  '}{' '}
					<Text type="description" style={{ color: 'hotpink' }}>
						♀️
					</Text>
					{12.5 * data.gender_rate}%
				</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					Egg Group
				</Text>
				<Text type="description">{eggGroup}</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					Catch rate
				</Text>
				<Text type="description">{data.capture_rate}</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					Generation
				</Text>
				<Text type="description">{capitalizeFirstLetter(data.generation.name)}</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					Hatch time
				</Text>
				<Text type="description">
					{data.hatch_counter} cycles - {255 * (data.hatch_counter + 1)} steps
				</Text>
			</View>
			<View style={styles.propertyRow}>
				<Text type="property" style={styles.property}>
					Leveling rate
				</Text>
				<Text type="description">{capitalizeFirstLetter(data.growth_rate.name)}</Text>
			</View>
			<Text type="headline" style={{ marginTop: 24 }}>
				Location
			</Text>
			<View style={styles.mockLocation}></View>
			<Text type="headline" style={{ marginTop: 24 }}>
				Sprites
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
	property: { width: 100 },
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
