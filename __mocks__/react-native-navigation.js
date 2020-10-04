export const Navigation = {
	registerComponent: () => Promise.resolve(),
	events: () => ({
		registerNavigationButtonPressedListener: () => ({
			remove: jest.fn()
		})
	})
}
