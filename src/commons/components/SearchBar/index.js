import React from 'react'
import { View, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { Navigation } from 'react-native-navigation'
import Input from './Input'
import i18n from '../../i18n'

function SearchBar({ componentId, style, onFocus, onBlur, ...props }) {
	function searchBarFocused() {
		if (Platform.OS === 'ios') {
			Navigation.mergeOptions(componentId, {
				topBar: {
					visible: false,
					animate: true
				}
			})
		}

		if (onFocus) this.props.onFocus()
	}

	function searchBarBlurred() {
		if (Platform.OS === 'ios') {
			Navigation.mergeOptions(componentId, {
				topBar: {
					visible: true,
					animate: true
				}
			})
		}

		if (onBlur) this.props.onBlur()
	}
	return (
		<View>
			<Input style={style} onFocus={searchBarFocused} onBlur={searchBarBlurred} {...props}></Input>
		</View>
	)
}

SearchBar.propTypes = {
	componentId: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChangeText: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
}

export default SearchBar
