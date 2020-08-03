module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': 0,
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'no-alert': 0,
    'react/no-did-mount-set-state': 0,
  },
};
