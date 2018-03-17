import * as NodeOAuthServer from 'oauth2-server'

import { Falsey } from './oauth'
import { Imodel } from './handles/token'
import dbClient, { Client } from '../model/Client'
import dbUser, { User } from '../model/User'
import dbAccessToken, { AccessToken as Token } from '../model/AccessToken'
import dbRefreshToken, { RefreshToken } from '../model/RefreshToken'

export default class OAuth2 implements Imodel {
  private server: NodeOAuthServer

  public getClient = async (clientId, clientSecret) => {
    const config = {
      client_id: clientId,
      client_secret: clientSecret
    }
    return await dbClient.findOne(config)
  }

  public getUser = async (username, password) => {
    const config = {
      username
    }
    return await dbUser.findOne(config).select('-salt -hash')
  }

  public getAccessToken = async (accessToken: string): Promise<Token> => {
    const data = await dbAccessToken
      .findOne({accessToken: accessToken})
      .populate('user')
      .populate('client')
    if (data) {
      data.accessTokenExpiresAt = new Date(data.expires)
    } else {
      return null
    }
    return data
  }

  public saveToken = (
    token,
    client,
    user
  ) => {
    const promise = [
      dbAccessToken.create({
        accessToken: token.accessToken,
        expires: token.accessTokenExpiresAt,
        client: client._id,
        user: user._id
      }),
      dbRefreshToken.create({ // no refresh token for client_credentials
        refreshToken: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        client: client._id,
        user: user._id
      })
    ]
    return Promise.all<any>(promise)
      .then(() => {
        return {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          user,
          client,
          ...token
        }
      })
  }

  // 校验RefreshToken的有效性
  public revokeToken = (token: Token) => {
    console.log(token)
    return dbRefreshToken.findOne({
      refreshToken: token.refreshToken
    }).then((savedRT) => {
      if (savedRT) {
        if (savedRT.expires < new Date()) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    });
  };

  public getRefreshToken = (refreshToken: string) => {
    return dbRefreshToken
      .findOne({refreshToken})
      .populate({
        path: 'user',
        select: '-salt -hash'
      })
      .populate('client')
      .then((savedRT) => {
        if (savedRT) {
          return {
            user: savedRT ? savedRT.user : {},
            client: savedRT ? savedRT.client : {},
            expires: savedRT ? new Date(savedRT.expires) : null,
            refreshToken
          };
        } else {
          return null
        }
      });
  };

  public saveAccessToken = (accessToken, clientId, expires, user: object, callback?: () => void) => {
    console.log('saveAccessToken', accessToken, clientId, expires)
    return
  }

  public verifyScope = (token: Token, scope: string): Promise<boolean> => {
    console.log('verifyScope', token, scope)
    return
  }
  // public saveAuthorizationCode = (
  //   code: AuthorizationCode,
  //   client: Client,
  //   user: User,
  //   callback?: Callback<AuthorizationCode>
  // ): Promise<AuthorizationCode> => {
  //   console.log('verifyScope', code, client, user)
  //   return
  // }
}
