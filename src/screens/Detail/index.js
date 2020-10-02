import React from 'react'
import { ScrollView, Image, StyleSheet } from 'react-native'
import { Text } from '../../commons/components'
import { capitalizeFirstLetter } from '../../commons/Helpers'
import StyleGuide from '../Main/components/Card/StyleGuide'

function Detail({ pokemon }) {
	return (
		<ScrollView style={[styles.container, StyleGuide.types[pokemon.types[0].type.name]]}>
			<Text type="title1" style={styles.largeTitle} nativeID={pokemon.name + 'titledetail'}>
				{capitalizeFirstLetter(pokemon.name)}
			</Text>
			<Image
				nativeID={pokemon.name + 'detail'}
				source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
				style={styles.image}></Image>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingTop: 12 },
	largeTitle: { color: 'white', marginLeft: 16 },
	image: { width: 225, height: 225, alignSelf: 'center' }
})

export default Detail
