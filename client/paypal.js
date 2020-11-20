const axios = require('axios')
const timeout = 20000
const payitError = require('../exception/PayitError')
const querystring = require('querystring');
const logger = require('../helpers/logger')

function handleError (err, data) {
    if (err.response) {
      console.log('PAYPAL ERROR: ', err.response.data)      
      logger.error(`PaypalClient: Error with status ${err.response.status} - ${err.message}`, err.request.data, err.response.data)
      return err.response.data
    } else {
      logger.error(`PaypalClient: Error with status 500 - ${err.message} from ${err.originalUrl} with trace`, err)
      return undefined
    }    
  }

const getToken = () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'        
    }
    const data = {
        grant_type: 'client_credentialss'
    }
    const auth = {
        username: process.env.PAYPAY_USERNAME,
        password: process.env.PAYPAY_PASSWORD,
    }
    return axios.post(`${process.env.PAYPAY_URL}/v1/oauth2/token`, querystring.stringify(data), { headers, timeout, auth })
    .then(resp => resp).catch(ex => handleError(ex, data))
}

const payout = (email, amount, token) => {
    const headers = {
        'authorization': `Bearer ${token}`
    }
    const data = {        
        sender_batch_header: {
          email_subject: 'You have a payment',
          sender_batch_id: 'batch-1591120144454'
        },
        items: [
          {
            recipient_type: 'EMAIL',
            amount: {
              value: amount,
              currency: 'MXN'
            },
            receiver: email,
            note: 'Payit cashout',
            sender_item_id: 'item-2-1591120144454'
          }
        ]
    }
    return axios.post(`${process.env.PAYPAY_URL}/v1/payments/payouts`, data, { headers, timeout })
    .then(resp => resp).catch(ex => handleError(ex, data))
}

module.exports = {
    async sendPayout(email, amount) {   
      const { data: { access_token } } = await getToken() 
      if(!access_token) {
        throw payitError('PAYPAL_AUTH_UNAVAILABLE', 503, 'PAYPAL_AUTH_UNAVAILABLE')
      }           
      return await payout(email, amount, access_token)      
    }
}