/**
 * Object representing the deep linking configuration.
 * @typedef {Object} LinkingConfig
 * @property {string[]} prefixes - The prefixes used for deep linking.
 * @property {Object} config - The configuration object for deep linking.
 * @property {Object} config.screens - The screens configuration for deep linking.
 */

/**
 * The deep linking object.
 * @type {LinkingConfig}
 */
const linking = {
  prefixes: ['akana://'],
  config: {
    screens: {
      ResetPassword: 'reset_password'
    }
  }
};

export default linking;