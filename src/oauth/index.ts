
import * as oauthServer from 'oauth2-server'
import model from './model'

export default new oauthServer({
  model: new model()
})
