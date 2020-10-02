import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '../../commons/components'
import Colors from '../../commons/Colors'
import About from './About'

function BottomSheetDetail({ pokemon }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Tab active>About</Tab>
				<Tab>Base Stats</Tab>
				<Tab>Evolution</Tab>
				<Tab>Moves</Tab>
			</View>
			<View style={styles.body}>
				<About pokemon={pokemon}></About>
			</View>
			<View style={styles.excedent}></View>
		</View>
	)
}

function Tab({ active, children, onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={[styles.tab, { color: active ? 'black' : 'gray' }]}>{children}</Text>
			{active && <View style={styles.line}></View>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.background,
		flex: 1,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		top: -30
	},
	excedent: {
		height: 600,
		backgroundColor: Colors.background,
		position: 'absolute',
		bottom: -600,
		left: 0,
		right: 0
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 24
	},
	tab: {
		fontWeight: '900',
		color: 'gray',
		fontSize: 14,
		marginTop: 32,
		marginBottom: 16
	},
	line: { height: 1, backgroundColor: 'black' },
	body: { paddingTop: 24, flex: 1 }
})

export default BottomSheetDetail
