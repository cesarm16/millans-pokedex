import React from 'react'
import { ScrollView, Image, StyleSheet, View } from 'react-native'
import { Text } from '../../commons/components'
import { capitalizeFirstLetter } from '../../commons/Helpers'
import StyleGuide from '../Main/components/Card/StyleGuide'
import BottomSheet from './BottomSheet'

function Detail({ pokemon }) {
	const { properties } = pokemon

	const badges = properties.types.map((value, index) => (
		<Badge type={value.type} key={value.slot}></Badge>
	))

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="never"
			style={[styles.container, StyleGuide.types[properties.types[0].type.name]]}
			scrollEnabled={true}>
			<Image source={POKEBALL} style={styles.pokeball}></Image>
			<View style={styles.titleContainer}>
				<Text type="title1" style={styles.whiteText} nativeID={pokemon.name + 'titledetail'}>
					{capitalizeFirstLetter(pokemon.name)}
				</Text>
				<Text type="title3" style={styles.whiteText}>
					#{PadWithZeroes(properties.id)}
				</Text>
			</View>
			<View style={styles.badgeContainer}>{badges}</View>
			<Image
				nativeID={pokemon.name + 'detail'}
				source={{ uri: properties.sprites.other['official-artwork'].front_default }}
				style={styles.image}></Image>
			<BottomSheet pokemon={properties}></BottomSheet>
		</ScrollView>
	)
}

function PadWithZeroes(n) {
	var s = '' + n
	while (s.length < 3) {
		s = '0' + s
	}
	return s
}

function Badge({ type }) {
	return (
		<View style={styles.badge}>
			<Text type="subhead" style={styles.badgeText}>
				{capitalizeFirstLetter(type.name)}
			</Text>
		</View>
	)
}

const POKEBALL = require('../../assets/images/pokeball.png')

const styles = StyleSheet.create({
	container: { flex: 1, paddingTop: 12 },
	whiteText: { color: 'white' },
	titleContainer: {
		marginHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	badgeContainer: {
		marginHorizontal: 16,
		flexDirection: 'row'
	},
	pokeball: { position: 'absolute', right: -16, top: 114, opacity: 0.3, width: 180, height: 180 },
	image: { width: 225, height: 225, alignSelf: 'center', zIndex: 9999 },
	badge: {
		paddingHorizontal: 18,
		paddingVertical: 4,
		backgroundColor: 'rgba(250,250,250,0.2)',
		marginRight: 8,
		alignItems: 'center',
		borderRadius: 20
	},
	badgeText: { color: 'white', fontWeight: 'bold' }
})

export default Detail
