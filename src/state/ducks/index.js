import { combineReducers } from 'redux'

import pokemons from './Pokemons/reducer'

const appReducer = combineReducers({ pokemons })

const rootReducer = (state, action) => {
	return appReducer(state, action)
}

export default rootReducer
