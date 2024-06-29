const lightColorSet = {
  mainThemeBackgroundColor: "#ffffff",
  mainThemeForegroundColor: "#003f5c",
};

const darkColorSet = {
  mainThemeBackgroundColor: "#121212",
  mainThemeForegroundColor: "#FFDEE9",
};

const colorSet = {
  ...lightColorSet,
  light: lightColorSet,
  dark: darkColorSet,
  "no-preference": lightColorSet,
};

const StyleDict = {
  colorSet,
};

export default StyleDict;
