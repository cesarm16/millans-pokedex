jest.mock('react-native-localize', () => jest.requireActual('./react-native-localize'))

jest.mock('@react-native-community/async-storage', () =>
	jest.requireActual('@react-native-community/async-storage/jest/async-storage-mock')
)

jest.mock('react-native-navigation', () => jest.requireActual('./react-native-navigation'))
