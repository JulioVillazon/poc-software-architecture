const axios = require('axios')
const timeout = 20000
const payitError = require('../exception/PayitError')
const querystring = require('querystring');

const getToken = () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const data = {
        grant_type: 'client_credentials',    
        client_id: 'shopper-manager-br',
        scope: 'openid',
        client_secret: '3c9c8b7e-1318-4e66-a6bd-2549a846a3dc'
    }
    return axios.post('https://auth.rappipay.com/auth/realms/dev/protocol/openid-connect/token', querystring.stringify(data), { headers, timeout })
    .then(resp => resp).catch(ex => { throw ex })
}

module.exports = {
    async generateToken() {   
      const { data: { access_token } } = await getToken()
      return access_token
    }
}