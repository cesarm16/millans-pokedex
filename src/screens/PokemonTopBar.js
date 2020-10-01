import React from 'react'
import { Image } from 'react-native'

function PokemonTopBar() {
	return (
		<Image source={POKEMON_LOGO} style={{ height: 32, width: 100 }} resizeMode="contain"></Image>
	)
}

const POKEMON_LOGO = require('../assets/images/pokemon.png')

export default PokemonTopBar
