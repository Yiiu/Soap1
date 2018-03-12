
import oauthServer from './oauth'
import model from './model'

export default new oauthServer({
  model: new model()
})
