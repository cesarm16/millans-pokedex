const fetchMiddleware = (store) => (next) => (action) => {
	if (!action || !action.fetch) return next(action)

	const { endpoint } = action.fetch

	return fetch('https://pokeapi.co/api/v2/' + endpoint)
		.then((response) => response.json())
		.then((response) => handleResponse(response, action, next))
		.catch((error) => handleErrors(error, action, next))
}

function handleErrors(err, action, next) {
	next({
		type: `${action.type}_FAILED`,
		payload: err,
		meta: action.fetch
	})

	return Promise.reject(err)
}

function handleResponse(res, action, next) {
	next({
		type: `${action.type}_COMPLETED`,
		payload: res,
		meta: action.fetch
	})

	return res
}

export default fetchMiddleware
