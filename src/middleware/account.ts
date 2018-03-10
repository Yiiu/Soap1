import * as oauthServer from 'oauth2-server'
import oauth from '../oauth'

export const isAuthenticated = async (req, res, next) => {
  const request = new oauthServer.Request({
    headers: {authorization: req.headers.authorization},
    method: req.method,
    query: req.query,
    body: req.body
  });
  const response = new oauthServer.Response(res);
  try {
    const auth = await oauth.authenticate(request, response)
    req.auth = auth
    return next()
  } catch (err) {
    console.log(err)
  }
}