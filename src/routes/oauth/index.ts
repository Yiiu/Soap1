import * as express from 'express'
import User from '../../model/User'
import * as oauthServer from 'oauth2-server'

import oauth from '../../oauth'

const router = express.Router()

router.all('/token', async (req, res, next) => {
  const request = new oauthServer.Request(req);
  const response = new oauthServer.Response(res);
  try {
    let token = await oauth.token(request, response)
    delete token.client
    return res.json(token)
  } catch (err) {
    return res.status(500).json(err)
  }
});

export default router
