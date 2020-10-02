import { createStore, applyMiddleware, compose } from 'redux'
import { persistReducer, persistStore, createMigrate } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import ReduxThunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import rootReducer from './ducks'
import { createLogger } from 'redux-logger'
import fetchMiddleware from './utils/fetchMiddleware'
import initialState from './utils/initialState'

const middleware = __DEV__
	? [ReduxThunk, reduxImmutableStateInvariant(), fetchMiddleware, createLogger({ collapsed: true })]
	: [ReduxThunk, fetchMiddleware]

const persistConfig = {
		key: 'root',
		version: 0,
		whitelist: [],
		storage: AsyncStorage
	},
	persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
	let store = createStore(persistedReducer, initialState, compose(applyMiddleware(...middleware)))
	function rehydrateStore() {
		return new Promise(function (resolve) {
			persistStore(store, null, function (x) {
				resolve(x)
			})
		})
	}
	return { store, rehydrateStore }
}
