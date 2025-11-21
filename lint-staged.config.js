const lintStagedConfig = {
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
};

export default lintStagedConfig;
