module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  roots: [
    '<rootDir>/src'
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  testRegex: '.*\.(test|spec)\\.(t|j)sx?$'
}
