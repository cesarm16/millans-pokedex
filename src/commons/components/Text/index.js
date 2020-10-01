import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, Platform } from 'react-native'

import StyleGuide from './StyleGuide'

function CustomText({ type, style, children }) {
	return (
		<Text style={[styles.defaultStyle, StyleGuide.typography[type || 'body'], style]}>
			{children}
		</Text>
	)
}

CustomText.propTypes = { type: PropTypes.string, style: Text.propTypes.style }

const styles = StyleSheet.create({
	defaultStyle: { fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto' }
})

export default CustomText
