const i18nLib = require('i18n')
const path = require('path')
const { DEFAULT_LANGUAGE } = process.env

exports.i18n = { __: undefined }
exports.default = exports.i18n
i18nLib.configure({
  defaultLocale: 'es',
  directory: path.resolve('./locales'),
  locales: ['es', 'pt', 'en'],
  register: exports.i18n
})

/**
 *
 * @param responseCode
 * @param params
 * @param lang
 *
 * @returns Translated phrase
 */

exports.i18nText = (responseCode, params, lang) => {
  const locale = lang || DEFAULT_LANGUAGE || 'es'

  return exports.i18n.__({ phrase: `${responseCode}`, locale }, params)
}
