import { combineReducers } from 'redux'

import pokemons from './Pokemons/reducer'
import pokemon from './Pokemon/reducer'
import species from './Species/reducer'

const appReducer = combineReducers({ pokemons, species, pokemon })

const rootReducer = (state, action) => {
	return appReducer(state, action)
}

export default rootReducer
