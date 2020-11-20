const jwt = require('jwt-simple')
const payitError = require('../exception/PayitError')
const wrap = require('../wrap')
const { i18nText } = require('../helpers/i18n')

const {
  AUDIENCE,
  ISSUER,
  CLIENT_ID,
  PUBLIC_KEY,
  SCOPE
} = process.env

const key = `
-----BEGIN PUBLIC KEY-----
${PUBLIC_KEY}
-----END PUBLIC KEY-----
`

module.exports = wrap(async function (req, res, next) {
  try {
    const { authorization } = req.headers
    if (!authorization) throw payitError(i18nText('MISSING_AUTH_HEADER'), 401, 'MISSING_AUTH_HEADER')

    const [authType, token] = authorization.trim().split(' ')
    if (authType && authType.toLowerCase() !== 'bearer') throw payitError(i18nText('WRONG_TYPE'), 401, 'WRONG_TYPE')

    const { scope, iss, aud, clientId, azp, resource_access: resourceAccess } = jwt.decode(token, key, false, 'RS256')
    console.log(`scope: ${scope}, iss: ${iss}, audience: ${aud}, clientId: ${clientId}`)
    if (iss !== ISSUER) {
      throw payitError(i18nText('WRONG_ISS'), 403, 'WRONG_ISS')
    }
    if (clientId !== CLIENT_ID) {
      throw payitError(i18nText('WRONG_CLIENT'), 403, 'WRONG_CLIENT')
    }
    if (!aud.includes(AUDIENCE)) {
      throw payitError(i18nText('WRONG_AUD'), 403, 'WRONG_AUD')
    }
    if (!scope.includes(SCOPE)) {
      throw payitError(i18nText('WRONG_SCOPE'), 403, 'WRONG_SCOPE')
    }

    next()
  } catch (error) {
    if (error.status === 403) {
      throw error
    }
    console.log('Rethrow error form auth middleware ', error)
    throw payitError(i18nText('INVALID_TOKEN'), 403, 'INVALID_TOKEN')
  }
})
