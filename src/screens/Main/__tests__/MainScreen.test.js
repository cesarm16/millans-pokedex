import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react-native'
import axios from 'axios'
import Main from '../index'

import testIds from '../../testIds'

import { Provider } from 'react-redux'
import configureStore from '../../../state/store'
const { store } = configureStore()

export function testRender(jsx, { store, ...otherOpts }) {
	return render(<Provider store={store}>{jsx}</Provider>, otherOpts)
}

const POKEMONS = {
	results: [
		{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
		{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
	]
}

jest.mock('axios')
axios.mockImplementation(() => Promise.resolve({ data: POKEMONS }))

describe('Main', () => {
	describe('when is fetching pokemons', () => {
		it('shows a loader', () => {
			const { getByTestId } = testRender(<Main />, { store })
			const loader = getByTestId(testIds.ACTIVITY_INDICATOR)
			expect(loader).toBeDefined()
			cleanup()
		})
	})

	describe('when fetching pokemons is done', () => {
		it('shows a list of pokemons', async () => {
			const { findByTestId } = testRender(<Main componentId="1" />, { store })
			const list = await findByTestId(testIds.POKEMON_LIST)
			expect(list).toBeDefined()
		})
	})

	describe('when searching', () => {
		it('for *saur* shows a bulbasaur', async () => {
			const { getByTestId, findByTestId } = testRender(<Main componentId="1" />, { store })
			const searchbar = getByTestId(testIds.SEARCH_BAR)
			fireEvent.changeText(searchbar, 'saur')
			const bulbasaur = await findByTestId(POKEMONS.results[0].name)
			expect(bulbasaur).toBeDefined()
		})
		it('for *saur* does not shows a pikachu', async () => {
			const { getByTestId, queryByTestId } = testRender(<Main componentId="1" />, { store })
			const searchbar = getByTestId(testIds.SEARCH_BAR)
			fireEvent.changeText(searchbar, 'saur')
			expect(queryByTestId(POKEMONS.results[1].name)).toBeNull()
		})
		it('for *1* shows a bulbasaur', async () => {
			const { getByTestId, findByTestId } = testRender(<Main componentId="1" />, { store })
			const searchbar = getByTestId(testIds.SEARCH_BAR)
			fireEvent.changeText(searchbar, '1')
			const bulbasaur = await findByTestId(POKEMONS.results[0].name)
			expect(bulbasaur).toBeDefined()
		})
		it('for *pika* shows a pikachu', async () => {
			const { getByTestId, findByTestId } = testRender(<Main componentId="1" />, { store })
			const searchbar = getByTestId(testIds.SEARCH_BAR)
			fireEvent.changeText(searchbar, 'pika')
			const pikachu = await findByTestId(POKEMONS.results[1].name)
			expect(pikachu).toBeDefined()
		})
		it('for *25* shows a pikachu', async () => {
			const { getByTestId, findByTestId } = testRender(<Main componentId="1" />, { store })
			const searchbar = getByTestId(testIds.SEARCH_BAR)
			fireEvent.changeText(searchbar, '25')
			const pikachu = await findByTestId(POKEMONS.results[1].name)
			expect(pikachu).toBeDefined()
		})
	})
})
