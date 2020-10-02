import React from 'react'
import { View, Image } from 'react-native'
import { Text } from '../../commons/components'

function Detail({ pokemon }) {
	return (
		<View>
			{console.log('pokmeon', pokemon)}
			<Text>Detail</Text>
		</View>
	)
}

export default Detail
