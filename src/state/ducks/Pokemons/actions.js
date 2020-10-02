export function fetchAllPokemons() {
	return {
		type: 'FETCH_ALL_POKEMONS',
		fetch: {
			endpoint: 'pokemon?limit=1050'
		}
	}
}
