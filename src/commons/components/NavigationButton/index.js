import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Text from '../Text'
import Icon from 'react-native-vector-icons/AntDesign'

function NavigationButton({ children, style, type, ...props }) {
	let icon = null
	switch (type) {
		case 'push':
			icon = <Icon name="right" size={18} style={{ height: 18 }}></Icon>
			break
		case 'selected':
			icon = <Icon name="check" size={18} style={{ height: 18 }}></Icon>
			break
	}
	return (
		<TouchableOpacity style={[styles.container, style]} {...props}>
			<Text>{children}</Text>
			{icon}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 42,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16
	}
})

export default NavigationButton
