import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '../../commons/components'
import { useSelector } from 'react-redux'

function Stats({ pokemonId }) {
	const pokemon = useSelector((state) => state.pokemon[pokemonId])

	const { stats } = pokemon

	const hp = stats.find((e) => e.stat.name === 'hp').base_stat
	const attack = stats.find((e) => e.stat.name === 'attack').base_stat
	const defense = stats.find((e) => e.stat.name === 'defense').base_stat
	const spatk = stats.find((e) => e.stat.name === 'special-attack').base_stat
	const spdef = stats.find((e) => e.stat.name === 'special-defense').base_stat
	const speed = stats.find((e) => e.stat.name === 'speed').base_stat
	const total = hp + attack + defense + spatk + spdef + speed
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text type="property" style={styles.property}>
					HP
				</Text>
				<Text type="description" style={styles.stat}>
					{hp}
				</Text>
				<ProgressBar stat={hp} color="#FF5959"></ProgressBar>
			</View>
			<View style={styles.row}>
				<Text type="property" style={styles.property}>
					Attack
				</Text>
				<Text type="description" style={styles.stat}>
					{attack}
				</Text>
				<ProgressBar stat={attack} color="#F5AC78"></ProgressBar>
			</View>
			<View style={styles.row}>
				<Text type="property" style={styles.property}>
					Defense
				</Text>
				<Text type="description" style={styles.stat}>
					{defense}
				</Text>
				<ProgressBar stat={defense} color="#FAE078"></ProgressBar>
			</View>
			<View style={styles.row}>
				<Text type="property" style={styles.property}>
					Sp Atk
				</Text>
				<Text type="description" style={styles.stat}>
					{spatk}
				</Text>
				<ProgressBar stat={spatk} color="#9DB7F5"></ProgressBar>
			</View>
			<View style={styles.row}>
				<Text type="property" style={styles.property}>
					Sp Def
				</Text>
				<Text type="description" style={styles.stat}>
					{spdef}
				</Text>
				<ProgressBar stat={spdef} color="#A7DB8D"></ProgressBar>
			</View>
			<View style={styles.row}>
				<Text type="property" style={styles.property}>
					Speed
				</Text>
				<Text type="description" style={styles.stat}>
					{speed}
				</Text>
				<ProgressBar stat={speed} color="#FA92B2"></ProgressBar>
			</View>
			<View style={styles.row}>
				<Text type="property" style={styles.property}>
					Total
				</Text>
				<Text type="description" style={styles.stat}>
					{total}
				</Text>
				<ProgressBar stat={total} maxstat={1512}></ProgressBar>
			</View>
		</View>
	)
}

function ProgressBar({ stat, maxstat, color }) {
	const MAX_STAT = maxstat || 252

	const percentage = (stat * 100) / MAX_STAT
	return (
		<View style={styles.progressbar}>
			<View
				style={{ width: `${percentage}%`, backgroundColor: color || 'olivedrab', flex: 1 }}></View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 24 },
	row: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
	property: { width: 80 },
	stat: { width: 40 },
	progressbar: {
		flex: 1,
		backgroundColor: 'silver',
		height: 5,
		alignSelf: 'center',
		borderRadius: 10
	}
})

export default Stats
