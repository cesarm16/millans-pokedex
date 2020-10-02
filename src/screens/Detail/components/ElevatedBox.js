import React from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../../../commons/Colors'

function ElevatedBox({ children, style }) {
	return <View style={[styles.elevation, style]}>{children}</View>
}

const styles = StyleSheet.create({
	elevation: {
		shadowColor: 'gray',
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowOpacity: 0.51,
		shadowRadius: 13.16,
		elevation: 20,
		backgroundColor: Colors.background,
		borderRadius: 15,
		paddingHorizontal: 24,
		paddingVertical: 16
	}
})

export default ElevatedBox
