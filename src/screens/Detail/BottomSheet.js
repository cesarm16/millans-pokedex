import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '../../commons/components'
import Colors from '../../commons/Colors'
import About from './About'
import Stats from './Stats'
import i18n from '../../commons/i18n'

function BottomSheetDetail({ pokemonId }) {
	const [selectedTab, setSelectedTab] = useState(0)

	const selected =
		selectedTab === 0 ? (
			<About pokemonId={pokemonId}></About>
		) : (
			<Stats pokemonId={pokemonId}></Stats>
		)

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Tab active={selectedTab === 0} onPress={() => setSelectedTab(0)}>
					{i18n.t('detail.tabs.1')}
				</Tab>
				<Tab active={selectedTab === 1} onPress={() => setSelectedTab(1)}>
					{i18n.t('detail.tabs.2')}
				</Tab>
				<Tab>{i18n.t('detail.tabs.3')}</Tab>
				<Tab>{i18n.t('detail.tabs.4')}</Tab>
			</View>
			<View style={styles.body}>{selected}</View>
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
