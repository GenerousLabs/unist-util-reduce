module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest"
  // },
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/__fixtures__/"]
  // moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
