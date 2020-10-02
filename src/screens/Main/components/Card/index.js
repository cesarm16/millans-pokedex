import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Text } from '../../../../commons/components'
import { capitalizeFirstLetter } from '../../../../commons/Helpers'
import StyleGuide from './StyleGuide'

function Card({ name, url, onPress }) {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				console.log('Card: ', json)
				setData(json)
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false))
	}, [])

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				style={[
					styles.container,
					StyleGuide.types[isLoading ? 'normal' : data.types[0].type.name]
				]}>
				<Image source={POKEBALL} style={styles.pokeball}></Image>
				{isLoading || (
					<Image
						source={{
							uri: data.sprites.other['official-artwork'].front_default
						}}
						style={styles.image}></Image>
				)}
				<Text type="title3" style={{ color: 'white', fontWeight: 'bold' }}>
					{capitalizeFirstLetter(name)}
				</Text>

				<View style={styles.badgeContainer}>
					{isLoading || data.types.map((value, index) => <Badge type={value.type}></Badge>)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

function Badge({ type }) {
	return (
		<View style={styles.badge}>
			<Text style={styles.badgeText} type="caption">
				{type.name}
			</Text>
		</View>
	)
}

const POKEBALL = require('../../../../assets/images/pokeball.png')

const styles = StyleSheet.create({
	container: {
		width: 160,
		height: 120,
		backgroundColor: 'lightgray',
		borderRadius: 8,
		paddingLeft: 16,
		paddingTop: 24,
		borderWidth: 1,
		overflow: 'hidden'
	},
	image: {
		width: 75,
		height: 75,
		position: 'absolute',
		bottom: 0,
		right: 0
	},
	badge: {
		backgroundColor: 'rgba(250,250,250,0.3)',
		borderRadius: 10,
		paddingHorizontal: 4,
		paddingVertical: 2,
		marginBottom: 4
	},
	badgeContainer: { marginTop: 4, alignItems: 'flex-start' },
	badgeText: { color: 'white', fontWeight: 'bold' },
	pokeball: { position: 'absolute', opacity: 0.15, bottom: -8, right: -8, height: 100, width: 100 }
})

export default Card
